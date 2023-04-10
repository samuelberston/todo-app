import { useAuth0 } from '@auth0/auth0-react';
import React, { useState, useEffect, useContext } from 'react';
import { components, default as ReactSelect } from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { getUserLists } from '../../../../../../../../../services/lists.service.js';
import { UserUUIDContext } from '../../../../../../UserUUIDContext.js'

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

const shapeOptions = (unshapedLists) => {
    return unshapedLists.map((unshapedList) => ({
        value: unshapedList.list_name,
        label: unshapedList.list_name,
        list_uuid: unshapedList.list_uuid
    }));
}

const AddListDropdown = (props) => {
  const [lists, setLists] = useState([]);
  const [optionsSelected, selectOptions] = useState(shapeOptions([{list_name: props.listName}]));
  const userUUID = useContext(UserUUIDContext);
  const { getAccessTokenSilently } = useAuth0();
  const { dispatch } = props;

  const loadUserLists = async () => {
    console.log('userUUID: ', userUUID);
    const accessToken = await getAccessTokenSilently();
    const {data, error} = await getUserLists(accessToken, userUUID);
    if (data) { setLists(data); }
    if (error) { console.error(error); }
  }

  useEffect(() => { loadUserLists(); }, [userUUID]);

  const handleChange = (selected => {
      selectOptions(selected);
  });

  return (
    <div id="addListDropdown">
        <CreatableSelect
            options={shapeOptions(lists)}
            // refactor so it's not multiple but you can also add a new one
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
    </div>  );
}

export default AddListDropdown;