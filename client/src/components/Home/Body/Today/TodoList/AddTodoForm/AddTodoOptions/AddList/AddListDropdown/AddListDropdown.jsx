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
        value: unshapedList.list_name || unshapedList.listName,
        label: unshapedList.list_name || unshapedList.listName,
        list_uuid: unshapedList.list_uuid || unshapedList.listUUID
    }));
}

const AddListDropdown = (props) => {
  const { dispatch, selectedList } = props;
  const [lists, setLists] = useState([]);
  const [optionSelected, selectOptions] = useState({list_uuid: selectedList.list_uuid, value: selectedList.list_name, label: selectedList.list_name});
  const userUUID = useContext(UserUUIDContext);
  const { getAccessTokenSilently } = useAuth0();

  const loadUserLists = async () => {
    console.log('userUUID: ', userUUID);
    const accessToken = await getAccessTokenSilently();
    const {data, error} = await getUserLists(accessToken, userUUID);
    if (data) { setLists(data); }
    if (error) { console.error(error); }
  }

  useEffect(() => { loadUserLists(); }, [userUUID]);

  useEffect(() => {
      dispatch( { type: 'LIST', val: optionSelected})
  }, [optionSelected]);

  const handleChange = (selected => {
      selectOptions(selected);
  });

  return (
    <div id="addListDropdown">
        <CreatableSelect
            options={shapeOptions(lists)}
//             isMulti
            closeMenuOnSelect={false}
            hideSelectedOptions={false}
            components={{
                Option
            }}
            onChange={handleChange}
            allowSelectAll={true}
            value={optionSelected}
        />
    </div>  );
}

export default AddListDropdown;