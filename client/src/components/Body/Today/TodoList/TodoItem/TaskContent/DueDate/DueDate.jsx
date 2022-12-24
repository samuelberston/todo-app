import React from 'react';

import styles from './DueDate.module.css';

function formatDate(date) {
    date = new Date(date);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    if (date != undefined){
        return months[date.getMonth()] + ' ' + date.getDate();
    }
}

const DueDate = (props) => {
    return (
        <div id={styles.dueDate}>
            <i class="fa-solid fa-calendar-days"></i>
            &nbsp;
            {formatDate(props.due)}
        </div>
    );
}

export default DueDate;
