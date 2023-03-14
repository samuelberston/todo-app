import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import { getUsersApi, postUsersApi } from '../../../services/users.service.js';

const Today = React.lazy(() => import('./Today/Today.jsx'));

import styles from './Body.module.css';

const Body = () => {
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
    if (data) { console.log(data); }
  }

  const handleUser = async () => {
    const { user_uuid } = await checkUserExists();
    if (!user_uuid) {
      await postUser();
    }
  }

  useEffect(() => {
    handleUser();
  }, []);

  return (
    <div id={styles.body}>
      <React.Suspense fallback={<div>Loading...</div>}>
        <Today />
      </React.Suspense>
    </div>
  );
};

export default Body;
