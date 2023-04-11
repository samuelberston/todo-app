import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import LogoutButton from './Logout/LogoutButton.jsx';
import styles from './UserModal.module.css';

const UserModal = (props) => {
  const { user } = useAuth0();
  return (
      <div id={styles.UserModal}>
        <div id={styles.UserInfo}>
          <img
            src={user.picture}
            alt="Profile"
            id={styles.Profile}
            className="profile__avatar"
          />
          <div id={styles.UserData}>
            <div id={styles.Name} className="profile__title">{user.name}</div>
            <span id={styles.Email} className="profile__description">{user.email}</span>
          </div>
        </div>
        <LogoutButton />
      </div>
  );
};

export default UserModal;