import React from 'react';

import styles from '../Navigation.module.css';

const Menu = (props) => {
    return (
        <div id="Menu" id={styles.NavigationItem} onClick={props.handleMenuClick}>
            <i className="fa-solid fa-bars"></i>
        </div>
    );
}

export default Menu;
