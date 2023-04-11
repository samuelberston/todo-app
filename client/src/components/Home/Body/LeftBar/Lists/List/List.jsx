import React, { useState, useEffect, useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { getListTodoCount } from '../../../../../../services/lists.service.js';
import { ViewHookContext } from '../../../ViewHookContext.js';
import styles from './List.module.css';

const List = (props) => {
    const [count, setCount] = useState(null);
    const { getAccessTokenSilently } = useAuth0();
    const { list_uuid, list_name } = props.list;
    const setListView = useContext(ViewHookContext);

    const getCount = async () => {
      const accessToken = await getAccessTokenSilently();
      const { data, error } = await getListTodoCount(accessToken, list_uuid);
      if (error) { console.error(error); }
      if (data) {
        setCount(data.count);
      }
    };

    useEffect(() => { getCount(); }, [list_uuid]);

    return (
      <div id={styles.List} onClick={() => { setListView(props.list) }}>
        <div id="listName">
          {list_name}
        </div>
        <div id="todoCount">
          {count}
        </div>
      </div>
    );
};

export default List;