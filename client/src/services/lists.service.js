import axios from 'axios';
import callExternalApi from './external-api.service.js';

// get /lists
const getUserLists = async (accessToken, user_uuid) => {
  const config = {
    url: '/lists',
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
}

// get /lists
const getListName = async (accessToken, list_uuid) => {
  const config = {
    url: '/lists',
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    params: {
      list_uuid
    }
  };

  const { data, error } = await callExternalApi({ config });

  return {
    data: data || null,
    error,
  };
}

// post /lists
const postLists = async (accessToken, list_name, user_uuid) => {
  const config = {
    url: '/lists',
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    data: {
      list_name,
      user_uuid
    }
  };

  const { data, error } = await callExternalApi({ config });

  return {
    data: data || null,
    error,
  };
}

export {
  getUserLists,
  getListName,
  postLists
};