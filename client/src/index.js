import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App/App.jsx';
import { Auth0ProviderWithNavigate } from './Auth0ProviderWithNavigate.js';

const root = createRoot(document.getElementById('root'));

root.render(
    <BrowserRouter>
      <Auth0ProviderWithNavigate>
        <App />
      </Auth0ProviderWithNavigate>
    </BrowserRouter>
);