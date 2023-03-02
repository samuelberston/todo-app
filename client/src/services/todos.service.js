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

// update todo

// delete todo

export default getTodosApi;
