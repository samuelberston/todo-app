import React from 'react';

const Today = React.lazy(() => import('./Today/Today.jsx'));

import styles from './Body.module.css';

const Body = () => {
  return (
    <div id={styles.body}>
      <React.Suspense fallback={<div>Loading...</div>}>
        <Today />
      </React.Suspense>
    </div>
  );
};

export default Body;
