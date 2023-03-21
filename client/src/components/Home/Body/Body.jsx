import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import { getUsersApi, postUsersApi } from '../../../services/users.service.js';

const Today = React.lazy(() => import('./Today/Today.jsx'));

import styles from './Body.module.css';

const Body = () => {
  const [userUUID, setUserUUID] = useState('no user');
  const { getAccessTokenSilently } = useAuth0();

  const checkUserExists = async () => {
    const accessToken = await getAccessTokenSilently();
    const { data, error } = await getUsersApi(accessToken);
    if (error) { console.error(error); }
    return {
        user_uuid: data?.user_uuid || null,
        error
    };
  };

  const postUser = async () => {
    const accessToken = await getAccessTokenSilently();
    const { data, error } = await postUsersApi(accessToken);
    if (error) { console.error(error); }
    return {
        user_uuid: data?.user_uuid || null,
        error
    }
  }

  const handleUser = async () => {
    console.log('checking user exists');
    let { user_uuid, error } = await checkUserExists();
    if (error) { console.error(error); }
    console.log('user_uuid: ', user_uuid);
    if (!user_uuid) {
      console.log('creating new user');
      let { user_uuid, error } = await postUser();
    }
    setUserUUID(user_uuid);
  }

  useEffect(() => {
    if (userUUID == 'no user') {
      handleUser();
    }
  }, []);

  return (
    <div id={styles.body}>
      {userUUID != 'no user'
      && <React.Suspense fallback={<div>Loading...</div>}>
        <Today userUUID={userUUID} />
      </React.Suspense>}
    </div>
  );
};

export default Body;
