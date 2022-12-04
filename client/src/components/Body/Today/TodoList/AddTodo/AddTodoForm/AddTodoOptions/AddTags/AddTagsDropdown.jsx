import React, { useState, useEffect } from 'react';
import { components, default as ReactSelect } from 'react-select';
import CreatableSelect from 'react-select/creatable';


// required props: tags, handleTagInputChange event handler

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
    const { tags, handleTagsInputChange } = props;

    const [optionsSelected, selectOptions] = useState(shapeOptions(props.selectedTags));

    useEffect(() => {
        handleTagsInputChange(optionsSelected);
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
