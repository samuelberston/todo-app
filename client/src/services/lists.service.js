import axios from 'axios';
import callExternalApi from './external-api.service.js';

// get /users
const getUserLists = async (accessToken, user_uuid) => {
  const config = {
    url: '/lists',
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    params: {
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
  getUserLists
};