import { useAuth0 } from '@auth0/auth0-react';
import React, { useState, useEffect, useContext } from 'react';
import { components, default as ReactSelect } from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { UserUUIDContext } from '../../../../../../UserUUIDContext.js'
import { ListsContext } from '../../../../../../ListsContext.js';
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
  const { dispatch, list } = props;
  const userUUID = useContext(UserUUIDContext);
  const lists = shapeOptions(useContext(ListsContext));
  const listView = useContext(ListViewContext);
  const [optionSelected, selectOption] = useState({
    value: list.list_name,
    label: list.list_name,
    list_uuid: list.list_uuid
  });
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    if (listView == 'Today') {
      selectOption(lists[0]);
      dispatch( { type: 'LIST', val: lists[0]})
    }
  }, []);

  useEffect(() => {
      dispatch( { type: 'LIST', val: optionSelected})
  }, [optionSelected]);

  const handleChange = (selected => {
      selectOption(selected);
  });

  return (
    <div id="addListDropdown">
        <CreatableSelect
            options={lists}
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