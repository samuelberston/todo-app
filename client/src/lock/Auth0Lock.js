import Auth0Lock from 'auth0-lock';

const lock = new Auth0Lock(
    process.env.REACT_APP_AUTH0_CLIENT_ID,
    process.env.REACT_APP_AUTH0_DOMAIN
);

export default lock;