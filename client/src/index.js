import React from 'react';
import { render } from 'react-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './components/App/App.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <App />
    ),
  },
]);

render((
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
), document.getElementById('root'));
