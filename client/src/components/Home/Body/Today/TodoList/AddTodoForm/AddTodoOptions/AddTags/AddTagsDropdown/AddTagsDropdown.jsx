import { useAuth0 } from '@auth0/auth0-react';
import React, { useState, useEffect } from 'react';
import { components, default as ReactSelect } from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { getTagsApi } from '../../../../../../../../../services/tags.service.js';

const Option = (props) => {
  return (
    <div>
      <components.Option {...props}>
        <input
          type="checkbox"
          checked={props.isSelected}
            onChange={() => null}
        />{" "}
        <label>{props.label}</label>
      </components.Option>
    </div>
  );
};

const shapeOptions = (unshapedTags) => {
    return unshapedTags.map((unshapedTag) => ({
        value: unshapedTag.tag,
        label: unshapedTag.tag,
        tag_id: unshapedTag.tag_id
    }));
}

const AddTagsDropdown = (props) => {
    const [tags, setTags] = useState([]);
    const [optionsSelected, selectOptions] = useState(shapeOptions(props.selectedTags));
    const { getAccessTokenSilently } = useAuth0();
    const { dispatch } = props;

    const loadAllTags = async () => {
        const accessToken = await getAccessTokenSilently();
        const { data, error } = await getTagsApi(accessToken);
        if (data) {
          setTags(data);
        }
        if (error) {
          setTags(JSON.stringify(error, null, 2));
        }
    }

    useEffect(() => {
        loadAllTags();
    }, [getAccessTokenSilently]);

    useEffect(() => {
        dispatch( { type: 'TAGS', val: optionsSelected})
    }, [optionsSelected]);


    const handleChange = (selected => {
        selectOptions(selected);
    });

    return (
        <div id="addTagsDropdown">
            <CreatableSelect
                options={shapeOptions(tags)}
                isMulti
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                components={{
                    Option
                }}
                onChange={handleChange}
                allowSelectAll={true}
                value={optionsSelected}
            />
        </div>
    );
}

export default AddTagsDropdown;