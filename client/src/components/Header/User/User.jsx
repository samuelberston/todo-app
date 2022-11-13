import React from 'react';

const User = (props) => {
    const firstInitial = props.username[0];
    return (
        <div id="user">
            {firstInitial}
            <i class="fa-solid fa-bell"></i>
        </div>
    );
}

export default User;
