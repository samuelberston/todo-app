import React, { useState } from 'react';

import AddListForm from './AddListForm/AddListForm.jsx';

import styles from '../Lists.module.css';

const AddList = (props) => {
    const [showForm, setShowForm] = useState(false);

    const toggleForm = () => {
      setShowForm(!showForm);
    }

    return (
      <div id="AddList" id={styles.ListOption}>
        <div id="AddIcon" onClick={() => { toggleForm(); }}>
          +
        </div>
        {showForm && <AddListForm userUUID={props.userUUID} exitForm={toggleForm} loadLists={props.loadLists} />}
      </div>
    );
}
export default AddList