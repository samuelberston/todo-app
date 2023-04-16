import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import PropTypes from 'prop-types';
import { deleteSubtasksApi } from '../../../../../../../../services/subtasks.service.js';
import TaskContent from '../../TaskContent/TaskContent.jsx';
import Checkbox from '../../Checkbox/Checkbox.jsx';
import Grip from '../../Grip/Grip.jsx';
import styles from './Subtask.module.css';

const Subtask = (props) => {
  const { subtask } = props;
  const { getAccessTokenSilently } = useAuth0();
  const tags = [];

  const deleteSubtask = async () => {
    const accessToken = await getAccessTokenSilently();
    const { data, error } = await deleteSubtaskApi(accessToken, subtask.subtask_uuid, subtask.user_uuid);
  };

  return (
    <div id={styles.Subtask}>
      <Grip />
      <Checkbox todoId={subtask.subtask_uuid} priority={subtask.priority} onCheck={deleteSubtask} />
      <TaskContent todo={subtask} tags={tags} />
    </div>
  );
};

Subtask.propTypes = {
  subtask: PropTypes.object.isRequired
};

export default Subtask;