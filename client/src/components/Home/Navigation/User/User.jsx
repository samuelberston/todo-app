import React from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './User.module.css';

const User = (props) => {
    const firstInitial = props.username[0];
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/profile');
    }

    return (
        <div id="user" className={styles.user} onClick={handleClick}>
            {firstInitial}
        </div>
    );
}

export default User;
