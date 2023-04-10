import React, { useState, useEffect, useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import PropTypes from 'prop-types';

import {getListName} from '../../../../../../../../services/lists.service.js';

const List = (props) => (
  <div>
    {props.listName}
  </div>
);

List.propTypes = {
  listName: PropTypes.string.isRequired
}

export default List;