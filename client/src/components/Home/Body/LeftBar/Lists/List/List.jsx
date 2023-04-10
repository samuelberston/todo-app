import React from 'react';

import styles from './List.module.css';

const List = (props) => (
  <div id={styles.List} onClick={() => { props.setListView(props.list.list_uuid) }}>
    <div id="listName">
      {props.list.list_name}
    </div>
    <div id="todoCount">
      {props.list.todo_count}
    </div>
  </div>
);

export default List;