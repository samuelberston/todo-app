import { useAuth0 } from "@auth0/auth0-react";
import React from 'react';
import { Route, Routes } from 'react-router-dom';


import axios from 'axios';

import Home from '../Home/Home.jsx';

axios.defaults.baseURL = 'http://localhost:3000';

const App = () => {
  const { isLoading } = useAuth0();

    if (isLoading) {
      return (
        <div className="page-layout">
          <div>loading...</div>
        </div>
      );
    }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/app" element={<Home />} />
    </Routes>
  );
};

export default App;
