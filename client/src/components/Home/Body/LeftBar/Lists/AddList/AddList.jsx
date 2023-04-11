import React, { useState } from 'react';
import Modal from 'react-modal';

import AddListForm from './AddListForm/AddListForm.jsx';

import styles from '../Lists.module.css';

Modal.setAppElement('#root');


const customStyles = {
  content: {
    top: '175px',
    left: '250px',
    width: '200px',
    right: 'auto',
    bottom: 'auto',
    'borderRadius': '10px',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    'flexDirection': 'column',
    'justifyContent': 'center',
    'fontFamily': 'Helvetica'
  },
};

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
        <Modal
          isOpen={showForm}
          onRequestClose={toggleForm}
          style={customStyles}
          shouldCloseOnOverlayClick={true}
          shouldCloseOnEsc={true}
        >
          <div id="NewListTitle">
            New List
          </div>
          <AddListForm userUUID={props.userUUID} exitForm={toggleForm} loadLists={props.loadLists} />
        </Modal>
      </div>
    );
}
export default AddList