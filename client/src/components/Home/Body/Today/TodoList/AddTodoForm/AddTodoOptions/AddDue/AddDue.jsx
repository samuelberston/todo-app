import React, { useState } from 'react';

import styles from './AddDue.module.css';

function formatDate(date) {
    date = new Date(date);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    if (date != undefined) {
        const day = date.getDate();
        return months[date.getMonth()] + ' ' + day;
    }
}

const AddDue = (props) => {
    const [active, setActive] = useState(false);

    return (
        <div id={styles.addDue}>
            {active ?
            <input type="date" name="dueDate" value={new Date(props.due).toISOString().split("T")[0]} onChange={(e) => {props.dispatch({type: 'DUE', val: e.target.value })}}/> :
            <div id={styles.dueDate} onClick={() => {setActive(!active)}}>
                <i className="fa-solid fa-calendar-days"></i>
                &nbsp;
                {formatDate(props.due)}
            </div>
            }
        </div>
    );
}

export default AddDue;
