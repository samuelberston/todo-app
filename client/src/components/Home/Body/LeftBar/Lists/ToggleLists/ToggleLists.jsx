import React, { useState } from 'react';

const ToggleLists = (props) => (
    <div id="ToggleList" onClick={() => { props.toggleShowLists(); }}>
      <i className="fa-solid fa-chevron-down"></i>
    </div>
);

export default ToggleLists;