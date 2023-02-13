import React from 'react';
import { BrowserRouter, createBrowserRouter, Route, Routes } from 'react-router-dom';

import axios from 'axios';

import styles from './App.module.css';

import Home from '../Home/Home.jsx';

axios.defaults.baseURL = 'http://localhost:3000';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
]);

const App = () => (
  <Routes>
    <Route path="/" element={<Home />} />
  </Routes>
);

export default App;
