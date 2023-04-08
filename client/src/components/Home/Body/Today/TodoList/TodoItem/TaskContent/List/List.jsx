import React, { useState, useEffect, useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import {getListName} from '../../../../../../../../services/lists.service.js';

const List = (props) => {
    const [listName, setListName] = useState('');
    const { getAccessTokenSilently } = useAuth0();

    const getListName = async () => {
        const accessToken = await getAccessTokenSilently();
        const { data, error } = await getListName(accessToken, props.list);
        if (error) { console.error(error); }
        if (data) { setListName(data); }
    }

    useEffect(() => {
      getListName();
    }, []);

    return (
      <div>
      list
        {listName}
      </div>
    );
}

export default List;