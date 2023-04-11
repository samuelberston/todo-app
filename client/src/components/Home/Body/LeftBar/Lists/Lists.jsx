import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import PropTypes from 'prop-types';

import AddList from './AddList/AddList.jsx';
import ToggleList from './ToggleLists/ToggleLists.jsx';
import List from './List/List.jsx';

import styles from './Lists.module.css';

import {getUserLists} from '../../../../../services/lists.service.js';

const Lists = (props) => {
  const [lists, setLists] = useState([]);
  const [showLists, setShowLists] = useState(true);
  const { user, getAccessTokenSilently } = useAuth0();

  const loadLists = async () => {
    const accessToken = await getAccessTokenSilently();
    const { data, error } = await getUserLists(accessToken, props.userUUID);
    if (error) {
      return {
        data: null,
        error
      };
    }
    if (data) {
      setLists(data);
      return {
        data,
        error: null
      };
    }
  }

  const toggleShowLists = () => {
    setShowLists(!showLists);
  }

  useEffect(() => {
    loadLists();
  }, [props.userUUID]);

  return (
    <div id="Lists">
      <div id={styles.ListController}>
        <div id={styles.ListTitle}>
          Lists
        </div>
        <div id={styles.ListOptions}>
          <AddList id={styles.ListOption} userUUID={props.userUUID} loadLists={loadLists} />
          <ToggleList id={styles.ListOption} toggleShowLists={toggleShowLists} showLists={showLists} />
        </div>
      </div>
      {showLists
      ? <div id="ListItems">
           {lists.map(list => <List key={list.list_uuid} list={list} />)}
        </div>
      : ''}
    </div>
  );
}

export default Lists;