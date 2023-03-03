import axios from 'axios';
import callExternalApi from './external-api.service.js';

// get /todos
const getTodosApi = async (accessToken) => {
  const config = {
    url: `/todos`,
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const { data, error } = await callExternalApi({ config });

  return {
    data: data || null,
    error,
  };
};

// post /todos
const postTodosApi = async (accessToken, body) => {
console.log('body: ', body);
  const config = {
    url: `/todos`,
    method: "POST",
    headers: {
      "content-type": "application/json",
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
  const config = {
    url: `/todos`,
    method: "PUT",
    headers: {
      "content-type": "application/json",
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

export {
    getTodosApi,
    postTodosApi,
    putTodosApi
};