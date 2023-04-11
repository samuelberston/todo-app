import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import PropTypes from 'prop-types';

import { getUserLists } from '../../../../services/lists.service.js';

import styles from './LeftBar.module.css';

import TodayButton from './TodayButton/TodayButton.jsx';
import Lists from './Lists/Lists.jsx';

const LeftBar = (props) => (
    <div id={styles.LeftBar}>
      <div id={styles.LeftBarSection}>
        <TodayButton />
      </div>
      <div id={styles.LeftBarSection}>
       <Lists userUUID={props.userUUID} />
      </div>
    </div>
);

LeftBar.propTypes = {
  userUUID: PropTypes.string.isRequired
}

export default LeftBar;