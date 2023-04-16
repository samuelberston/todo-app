import axios from 'axios';
import callExternalApi from './external-api.service.js';

// get /subtasks
// @param todo_uuid
// @param user_uuid
const getSubtasksApi = async (accessToken, todo_uuid, user_uuid) => {
  const config = {
    url: '/subtasks',
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    params: {
      todo_uuid,
      user_uuid
    }
  };

  const { data, error } = await callExternalApi({ config });

  return {
    data: data || null,
    error,
  };
};

const postSubtasksApi = async (accessToken, body) => {
    const config = {
      url: '/subtasks',
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      data: {
        ...body
      }
    };

    const { data, error } = await callExternalApi({ config });

    return {
      data: data || null,
      error,
    };
};

const deleteSubtasksApi = async (accessToken, subtask_uuid, user_uuid) => {
    const config = {
      url: '/subtasks',
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        subtask_uuid,
        user_uuid
      }
    };

    const { data, error } = await callExternalApi({ config });

    return {
      data: data || null,
      error,
    };
};

export {
  getSubtasksApi,
  postSubtasksApi,
  deleteSubtasksApi
};