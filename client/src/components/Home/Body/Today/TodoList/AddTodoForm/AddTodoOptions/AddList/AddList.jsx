import React, { useState } from 'react';

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
      {showDropdown && 'Add List Dropdown'}
    </div>
  );
}

export default AddList;