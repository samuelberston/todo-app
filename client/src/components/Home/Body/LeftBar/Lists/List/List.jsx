import React from 'react';

import styles from './List.module.css';

const List = (props) => (
  <div id={styles.List}>
    <div id="listName">
      {props.list.list_name}
    </div>
    <div id="todoCount">
      {props.list.todo_count}
    </div>
  </div>
);

export default List;