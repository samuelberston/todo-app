import React from 'react';
import ReactDOM from 'react-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import getConfig from './config';

import App from './components/App/App.jsx';

const config = getConfig();

const providerConfig = {
  domain: config.domain,
  clientId: config.clientId,
};

ReactDOM.render(
  <Auth0Provider domain={providerConfig.domain} clientId={providerConfig.clientId}>
    <App />
  </Auth0Provider>,
  document.getElementById('root'),
);
