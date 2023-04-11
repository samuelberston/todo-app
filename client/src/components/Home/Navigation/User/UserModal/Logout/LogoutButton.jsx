import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import styles from './LogoutButton.module.css';

const LogoutButton = () => {
  const { logout } = useAuth0();

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  return (
    <button id={styles.LogoutButton} className="button__logout" onClick={handleLogout}>
      <i class="fa-solid fa-right-from-bracket"></i>
      Log Out
    </button>
  );
};

export default LogoutButton;
