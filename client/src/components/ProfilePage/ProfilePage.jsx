import { useAuth0 } from "@auth0/auth0-react";
import lock from '../../lock/Auth0lock.js';
import React from "react";

const ProfilePage = () => {
  const { user, getAccessTokenSilently } = useAuth0();

  const getUserInfo = async () => {
    const accessToken = await getAccessTokenSilently();

    lock.getUserInfo(accessToken, (error, data) => {
      if (error) { console.error(error); }
      if (data) { console.log(data); }
    });
  }
  getUserInfo();

  if (!user) {
    return null;
  }

  return (
      <div className="content-layout">
        <h1 id="page-title" className="content__title">
          Profile Page
        </h1>
        <div className="content__body">
          <p id="page-description">
            <span>
              You can use the <strong>ID Token</strong> to get the profile
              information of an authenticated user.
            </span>
            <span>
              <strong>Only authenticated users can access this page.</strong>
            </span>
          </p>
          <div className="profile-grid">
            <div className="profile__header">
              <img
                src={user.picture}
                alt="Profile"
                className="profile__avatar"
              />
              <div className="profile__headline">
                <h2 className="profile__title">{user.name}</h2>
                <span className="profile__description">{user.email}</span>
              </div>
            </div>
            <div className="profile__details">
              <div
                title="Decoded ID Token"
                code={JSON.stringify(user, null, 2)}
              />
            </div>
          </div>
        </div>
      </div>
  );
};

export default ProfilePage;