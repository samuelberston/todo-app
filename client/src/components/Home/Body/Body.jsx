import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import { getUsersApi, postUsersApi } from '../../../services/users.service.js';
import {UserUUIDContext} from './UserUUIDContext.js';

const LeftBar = React.lazy(() => import('./LeftBar/LeftBar.jsx'));
const Today = React.lazy(() => import('./Today/Today.jsx'));

import styles from './Body.module.css';

const Body = (props) => {
  const [userUUID, setUserUUID] = useState('no user');
  const { user, getAccessTokenSilently } = useAuth0();

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
    console.log('user email: ', user.email);
    const { data, error } = await postUsersApi(accessToken, user.email);
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
      console.log('user email: ', user.email);
      let { user_uuid, error } = await postUser();
    }
    setUserUUID(user_uuid);
  }

  useEffect(() => {
    if (userUUID == 'no user') {
      handleUser();
    }
  }, [userUUID]);

  return (
    <div id={styles.body}>
      {userUUID != 'no user' &&
      <React.Suspense fallback={<div>Loading...</div>}>
        <UserUUIDContext.Provider value={userUUID}>
          {props.showMenu && <LeftBar userUUID={userUUID} />}
          <Today userUUID={userUUID} />
        </UserUUIDContext.Provider>
      </React.Suspense>}
    </div>
  );
};

export default Body;
