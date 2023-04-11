import React, { useState, useEffect, useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import PropTypes from 'prop-types';
import { ViewHookContext } from '../../../../../ViewHookContext.js';

import styles from './ListName.module.css';

const ListName = (props) => {
    const setListView = useContext(ViewHookContext);
    const { listUUID, listName } = props;

    const updateListView = () => {
      setListView({
        list_uuid: listUUID,
        list_name: listName
      });
    };

    return (
      <div id={styles.ListName} onClick={() => { updateListView(); }}>
        {props.listName}
      </div>
    );
}

ListName.propTypes = {
  listName: PropTypes.string.isRequired,
  listUUID: PropTypes.string.isRequired
}

export default ListName;