import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import PropTypes from 'prop-types';
import { getSubtasksApi } from '../../../../../../../services/subtasks.service.js';
import Subtask from './Subtask/Subtask.jsx';
import styles from './Subtasks.module.css';

const Subtasks = (props) => {
  const [subtasks, setSubtasks] = useState([]);
  const { getAccessTokenSilently } = useAuth0();
  const { todo_uuid, user_uuid } = props;

  const loadSubtasks = async () => {
    console.log('loadSubtasks');
    const accessToken = await getAccessTokenSilently();
    const { data, error } = await getSubtasksApi(accessToken, todo_uuid, user_uuid);
    if (error) { console.error(error); }
    if (data) { setSubtasks(data); }
  };

  useEffect(() => { loadSubtasks(); }, [todo_uuid]);

  return (
    <div id={styles.Subtasks}>
      { subtasks.length != 0
        && subtasks.map((item) => {
          return <Subtask key={item.subtask_uuid} subtask={item} />
        })
      }
    </div>
  );
};

Subtasks.propTypes = {
  todo_uuid: PropTypes.string.isRequired,
  user_uuid: PropTypes.string.isRequired
}

export default Subtasks;