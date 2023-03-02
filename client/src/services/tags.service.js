import axios from 'axios';
import callExternalApi from './external-api.service.js';

const getTodosTagsApi = async (accessToken, todoId) => {
  const config = {
    url: `/tags?todoId=${todoId}`,
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

const getAllTagsApi = async (accessToken) => {
  const config = {
    url: `/tags`,
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

// add Tag

// add todosTag

// delete todosTag

export { getTodosTagsApi, getAllTagsApi };
