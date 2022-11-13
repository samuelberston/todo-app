import React, {useState} from 'react';

import styles from './Checkbox.module.css';

const Checkbox = (props) => {
    const [show, hide] = useState(false);
    return (
        <div id={styles.checkbox} onMouseOver={() => hide(true)} onMouseLeave={() => hide(false)}>
            <div className={show ? styles.show : styles.hide}>
                <i class={"fa-solid fa-check"} ></i>
            </div>
        </div>
    );
}

export default Checkbox;
