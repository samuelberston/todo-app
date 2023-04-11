import { useAuth0 } from '@auth0/auth0-react';
import React, { useState, useEffect, useContext } from 'react';
import { components, default as ReactSelect } from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { getUserLists } from '../../../../../../../../../services/lists.service.js';
import { UserUUIDContext } from '../../../../../../UserUUIDContext.js'
import { ListViewContext } from '../../../../../../ListViewContext.js';

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
  const userUUID = useContext(UserUUIDContext);
  const listView = useContext(ListViewContext);
  const [lists, setLists] = useState([]);
  const [optionSelected, selectOption] = useState(listView);
  const { getAccessTokenSilently } = useAuth0();
  const { dispatch } = props;

  // refactor to not use this, and instead get data from left bar component or shared parent components
  const loadUserLists = async () => {
    const accessToken = await getAccessTokenSilently();
    const {data, error} = await getUserLists(accessToken, userUUID);
    if (data) {
      setLists(shapeOptions(data)); }
    if (error) { console.error(error); }
  }

  useEffect(() => { loadUserLists(); }, [userUUID]);

  useEffect(() => {
    if (listView == 'Today') {
      selectOption(lists[0]);
    }
  }, [lists]);

  useEffect(() => {
      dispatch( { type: 'LIST', val: optionSelected})
  }, [optionSelected]);

  const handleChange = (selected => {
      selectOption(selected);
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