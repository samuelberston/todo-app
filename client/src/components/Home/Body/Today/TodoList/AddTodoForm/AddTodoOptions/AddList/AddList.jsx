import React, { useState } from 'react';

import AddListDropdown from './AddListDropdown/AddListDropdown.jsx';

const AddList = (props) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  }

  return (
    <div id="AddList">
      <div id="AddListIcon" onClick={ () => { toggleDropdown(); }}>
        <i className="fa-solid fa-list"></i>
      </div>
      {showDropdown && <AddListDropdown dispatch={props.dispatch} listName={props.listName} />}
    </div>
  );
}

export default AddList;