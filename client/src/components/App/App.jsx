import React from 'react';
import { Route, Routes } from 'react-router-dom';

import axios from 'axios';

import Home from '../Home/Home.jsx';

axios.defaults.baseURL = 'http://localhost:3000';

const App = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/app" element={<Home />} />
  </Routes>
);

export default App;
