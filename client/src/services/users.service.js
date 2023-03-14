import axios from 'axios';
import callExternalApi from './external-api.service.js';

// get /users
const getUsersApi = async (accessToken) => {
  const config = {
    url: '/users',
    method: 'GET',
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
}

// post /users
const postUsersApi = async (accessToken) => {
  const config = {
    url: '/users',
    method: 'POST',
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
}

export {
  getUsersApi,
  postUsersApi
};