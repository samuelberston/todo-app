import React, { useState, useEffect, useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import PropTypes from 'prop-types';

import styles from './ListName.module.css';

const ListName = (props) => (
  <div id={styles.ListName}>
    {props.listName}
  </div>
);

ListName.propTypes = {
  listName: PropTypes.string.isRequired
}

export default ListName;