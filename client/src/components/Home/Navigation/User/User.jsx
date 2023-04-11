import React from 'react';
import Popup from 'reactjs-popup';
import { useNavigate } from 'react-router-dom';
import UserModal from './UserModal/UserModal.jsx';
import styles from './User.module.css';

const User = (props) => {
    const firstInitial = props.username[0];
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/profile');
    }

    return (
        <div id="user" className={styles.user}>
{/*             {firstInitial} */}
            <Popup
              trigger={<div>{firstInitial}</div>}
              nested
            >
              <UserModal />
            </Popup>
        </div>
    );
}

export default User;
