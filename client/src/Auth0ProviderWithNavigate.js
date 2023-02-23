import React from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import history from './utils/history.js';
import getConfig from './config';

export const Auth0ProviderWithNavigate = ({ children }) => {
  const navigate = useNavigate();

//  const domain = process.env.REACT_APP_AUTH0_DOMAIN;
//  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
//  const redirectUri = process.env.REACT_APP_AUTH0_CALLBACK_URL;

  const config = getConfig()

  const onRedirectCallback = (appState) => {
    navigate(redirectUri);
  };

  return (
    <Auth0Provider
      domain={'dev-jihbnjganm0cspwz.us.auth0.com'}
      clientId={'nElDQV2J46Kn3nLUaCjqWxi42s1IAO76'}
      authorizationParams={{
        redirect_uri: 'http://127.0.0.1:8080',
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};
