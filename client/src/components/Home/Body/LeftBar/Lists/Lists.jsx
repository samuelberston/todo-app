import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import PropTypes from 'prop-types';

import List from './List/List.jsx';

import {getUserLists} from '../../../../../services/lists.service.js';

const Lists = (props) => {
  const [lists, setLists] = useState([]);
  const { user, getAccessTokenSilently } = useAuth0();

  const getLists = async () => {
    const accessToken = await getAccessTokenSilently();
    const { data, error } = await getUserLists(accessToken, props.userUUID);
    if (error) { console.error(error); }
    if (data) { setLists(data); }
}

  useEffect(() => {
    getLists();
  }, []);

  return (
    <div>
      Lists
      {lists.map(list => <List key={list.list_uuid} list={list} />)}
    </div>
  );
}

export default Lists;