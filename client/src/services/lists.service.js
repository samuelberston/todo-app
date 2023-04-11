import axios from 'axios';
import callExternalApi from './external-api.service.js';

// get /lists
// @param user_uuid
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
};

// get /lists
// @param list_uuid
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
};

// post /lists
// @param list_name
// @param user_uuid
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
  console.log('data: ', data);

  return {
    data: data || null,
    error,
  };
};

// put /lists
// @param list_name
const updateListName = async (accessToken, list_name) => {
  const config = {
      url: '/lists',
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        list_name
      }
  };

  const { data, error } = await callExternalApi({ config });

  return {
    data: data || null,
    error,
  };
};

// put /lists
// @param list_uuid
const incrementListsTodoCount = async (accessToken, list_uuid) => {
  const config = {
      url: '/lists',
      method: 'PUT',
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
};

// put /lists
// @param list_uuid
const decrementListsTodoCount = async (accessToken, list_uuid) => {
  const config = {
      url: '/lists',
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        list_uuid,
        dec: true
      }
  };

  const { data, error } = await callExternalApi({ config });

  return {
    data: data || null,
    error,
  };
};

// delete /lists
// @param list_uuid
// put /lists
// @param list_uuid
const deleteLists = async (accessToken, list_uuid) => {
  const config = {
      url: '/lists',
      method: 'DELETE',
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
};

export {
  getUserLists,
  getListName,
  postLists,
  updateListName,
  incrementListsTodoCount,
  decrementListsTodoCount,
  deleteLists
};