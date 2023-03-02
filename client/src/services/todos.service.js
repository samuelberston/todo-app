import axios from 'axios';
import callExternalApi from './external-api.service.js';

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

// create todo
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

// update todo

// delete todo

export {getTodosApi, postTodosApi};
