import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import { getUsersApi, postUsersApi } from '../../../services/users.service.js';
import { getUserLists } from '../../../services/lists.service.js';
import { UserUUIDContext } from './UserUUIDContext.ts';
import { ListsContext } from './ListsContext.ts';
import { ViewHookContext } from './ViewHookContext.ts';
import { ListViewContext } from './ListViewContext.ts';

const LeftBar = React.lazy(() => import('./LeftBar/LeftBar.jsx'));
const Today = React.lazy(() => import('./Today/Today.jsx'));

import styles from './Body.module.css';

// Define the type for the props
interface BodyProps {
  showMenu: boolean;
}

// Define the types for the state
type UserUUIDState = string;
interface List {
  id: string;
  name: string;
  // Add other properties that exist in your list objects
}
type ListsState = List[];

const Body: React.FC<BodyProps> = ({ showMenu }) => {
  const [userUUID, setUserUUID] = useState<UserUUIDState>('no user');
  const [lists, setLists] = useState<ListsState>([]);
  const [listView, setListView] = useState<string>('Today');
  const { user, getAccessTokenSilently, isAuthenticated } = useAuth0();

  const checkUserExists = async (): Promise<{ user_uuid: string | null; error: any }> => {
    const accessToken = await getAccessTokenSilently();
    const { data, error } = await getUsersApi(accessToken);
    if (error) { console.error(error); }
    return {
        user_uuid: data?.user_uuid || null,
        error
    };
  };

  const postUser = async (): Promise<{ user_uuid: string | null; error: any }> => {
    if (!user) return { user_uuid: null, error: 'User is undefined' }; // Early return if user is not available
    const accessToken = await getAccessTokenSilently();
    console.log('user email: ', user.email);
    const { data, error } = await postUsersApi(accessToken, user.email);
    if (error) { 
      console.error(error); 
    }
    return {
        user_uuid: data?.user_uuid || null,
        error
    }
  }

  const handleUser = async () => {
    if (!user) return; // Early return if user is not available
    console.log('checking user exists');
    let { user_uuid, error } = await checkUserExists();
    if (error) { 
      console.error(error); 
      return; 
    }
    console.log('user_uuid: ', user_uuid);
    if (!user_uuid) {
      console.log('creating new user');
      console.log('user email: ', user.email);
      let { user_uuid, error } = await postUser();
    }
    setUserUUID(user_uuid ?? 'no user');  // Ensure user_uuid is a string before setting it
  }

  const loadLists = async (): Promise<{ data: List[] | null; error: any }> => {
    try {
      const accessToken = await getAccessTokenSilently();
      const { data, error } = await getUserLists(accessToken, userUUID);
      if (error) {
        return {
          data: null,
          error
        };
      }
      if (data) {
        setLists(data);
        return {
          data,
          error: null
        };
      }
      
      // Return a default response if no data or error is returned (handle unexpected cases)
      return {
        data: null,
        error: 'No data available'
      };
  
    } catch (err) {
      // Catch block to handle any exceptions and return an error state
      return {
        data: null,
        error: err
      };
    }
  };

  useEffect(() => {
    if (userUUID == 'no user' && isAuthenticated) {
      handleUser();
    }
  }, [userUUID]);

  useEffect(() => {
    if (userUUID !== 'no user' && isAuthenticated) {
      loadLists();
    }
  }, [userUUID]);

  return (
    <div id={styles.body}>
      {userUUID != 'no user' &&
      <React.Suspense fallback={<div>Loading...</div>}>
        <UserUUIDContext.Provider value={userUUID}>
          <ListsContext.Provider value={lists}>
            <ViewHookContext.Provider value={setListView}>
                <ListViewContext.Provider value={listView}>
                  {showMenu && <LeftBar />}
                  <Today userUUID={userUUID} listView={listView} />
                </ListViewContext.Provider>
            </ViewHookContext.Provider>
          </ListsContext.Provider>
        </UserUUIDContext.Provider>
      </React.Suspense>}
    </div>
  );
};

export {
  Body
};
