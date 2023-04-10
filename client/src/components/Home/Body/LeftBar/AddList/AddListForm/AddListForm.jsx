import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { postLists } from '../../../../../../services/lists.service.js';

const AddListForm = (props) => {
  const [listName, setListName] = useState('');
  const { getAccessTokenSilently } = useAuth0();

  const handleNameChange = (e) => {
    setListName(e.target.value);
  }

  const submitList = async (e) => {
    e.preventDefault();
    console.log('submit list');
    const accessToken = await getAccessTokenSilently();
    const { data, error } = await postLists(accessToken, listName, props.userUUID);
    if (data) { console.log('Created list with uuid: ', data); }
    if (error) { console.error(error); }
  }

  return (
    <div onSubmit={(e) => { submitList(e); }}>
      <form>
        <input type="text" name="listName" value={props.listName} onChange={(e) => { handleNameChange(e); }} />
{/*         <input type="color" /> */}
        <button type="submit"> Add </button>
      </form>
    </div>
  );
}



export default AddListForm;