import React from 'react';

const Menu = (props) => {
    return (
        <div id="Menu" onClick={props.handleMenuClick}>
            <i className="fa-solid fa-bars"></i>
        </div>
    );
}

export default Menu;
