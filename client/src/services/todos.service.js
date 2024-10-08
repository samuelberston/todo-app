import axios from 'axios';
import callExternalApi from './external-api.service.js';

// get /todos
const getTodosApi = async (accessToken, user_uuid) => {
  const config = {
    url: '/todos',
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    params: {
      user_uuid,
    }
  };

  const { data, error } = await callExternalApi({ config });

  return {
    data: data || null,
    error,
  };
};

/*
* get /todos - Get todos for a list and user
* @param user_uuid
* @param list_uuid
*/
const getTodosFromListApi = async (accessToken, user_uuid, list_uuid) => {
  const config = {
    url: '/todos',
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    params: {
      user_uuid,
      list_uuid
    }
  };

  const { data, error } = await callExternalApi({ config });

  return {
    data: data || null,
    error,
  };
};

// post /todos
const postTodosApi = async (accessToken, body) => {
  const config = {
    url: '/todos',
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    data: {...body}
  };

  const { data, error } = await callExternalApi({ config });

  return {
    data: data || null,
    error,
  };
};

// put /todos
const putTodosApi = async (accessToken, todo_id, body) => {
  console.log('body: ', body);
  console.log('todo_id: ', todo_id);
  const config = {
    url: '/todos',
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    data: {
        todo_id,
        ...body
    }
  };

  const { data, error } = await callExternalApi({ config });

  return {
    data: data || null,
    error,
  };
};

// delete todo
const deleteTodosApi = async (accessToken, todo_id, user_uuid) => {
  const config = {
    url: `/todos?todoId=${todo_id}&user_uuid=${user_uuid}`,
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    }
  };

  const { data, error } = await callExternalApi({ config });

  return {
    data: data || null,
    error,
  };
};

export {
    getTodosApi,
    getTodosFromListApi,
    postTodosApi,
    putTodosApi,
    deleteTodosApi
};