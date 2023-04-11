import React, { useState, useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { postLists } from '../../../../../../../services/lists.service.js';
import { UserUUIDContext } from '../../../../UserUUIDContext.js';
import styles from './AddListForm.module.css';

const AddListForm = (props) => {
  const [listName, setListName] = useState('');
  const { getAccessTokenSilently } = useAuth0();
  const userUUID = useContext(UserUUIDContext);
  const { exitForm, loadLists } = props;

  const handleNameChange = (e) => {
    setListName(e.target.value);
  }

  const submitList = async (e) => {
    e.preventDefault();
    console.log('submit list');
    const accessToken = await getAccessTokenSilently();
    var { data, error } = await postLists(accessToken, listName, userUUID);
    if (data) {
      console.log('Created list with uuid: ', data);
      var { data, error } = loadLists();
      // handle error
      if (error) { console.log(error); }
    }
    if (error) { console.error(error); }
    exitForm();
  }

  return (
    <div onSubmit={(e) => { submitList(e); }}>
      <form>
        <div id={styles.name}>
          Name
          <input type="text" name="listName" value={listName} onChange={(e) => { handleNameChange(e); }} />
        </div>
        <div id={styles.buttons}>
          <button id={styles.Cancel} onClick={() => { props.exitForm(); }}> Cancel </button>
          <button id={styles.Add} type="submit"> Add </button>
        </div>
      </form>
    </div>
  );
}



export default AddListForm;