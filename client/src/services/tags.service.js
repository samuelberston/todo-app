import axios from 'axios';
import callExternalApi from './external-api.service.js';

// get /tags
const getTagsApi = async (accessToken) => {
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

// get /tags?todoId=${todoId}
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

// post /tags
const postTagsApi = async (accessToken, tagName) => {
  const config = {
    url: `/tags`,
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`
    },
    data: {
      tagName
    }
  };

  const { data, error } = await callExternalApi({ config });
  console.log('postTagsAPI res: ', data);

  return {
    data: data || null,
    error,
  };
};

// post /todos-tags
const postTodosTagsApi = async (accessToken, todoId, tagId) => {
  const config = {
    url: `/todos-tags`,
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`
    },
    data: {
      todoId,
      tagId
    }
  };

  const { data, error } = await callExternalApi({ config });
  console.log('postTodosTagsApi res: ', data);

  return {
    data: data || null,
    error,
  };
};



// delete todosTag
const deleteTodosTagsApi = async (accessToken, todoId, tagId) => {
  const config = {
    url: '/todos-tags',
    method: 'DELETE',
    headers: {
      'content-type': "application/json",
      Authorization: `Bearer ${accessToken}`
    },
    data: {
      todoId,
      tagId
    }
  };

  const { data, error } = await callExternalApi({ config });
  console.log('deleteTodosTagsApi res: ', data);

  return {
    data: data || null,
    error,
  };
};

export {
    getTagsApi,
    postTagsApi,
    getTodosTagsApi,
    postTodosTagsApi,
    deleteTodosTagsApi
};