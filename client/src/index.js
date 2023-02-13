import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import getConfig from './config';

import App from './components/App/App.jsx';

const config = getConfig();

const providerConfig = {
  domain: config.domain,
  clientId: config.clientId,
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
]);

ReactDOM.render(
  <Auth0Provider domain={providerConfig.domain} clientId={providerConfig.clientId}>
    <RouterProvider router={router} />
  </Auth0Provider>,
  document.getElementById('root'),
);
