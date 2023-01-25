import React from 'react';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3000';

import styles from './App.module.css';

import Header from './Header/Header.jsx';
import Body from './Body/Body.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: []
    };
  }

  componentDidMount() {
    axios.get('/todos')
      .then(res => {
        this.setState({
          todos: res.data
        })
      })
      .catch(err => console.error(err))
  }

  render() {
    return (
      <div id={styles.container} className="app">
        <Header username="Samuel"/>
        <Body />
      </div>
    );
  }
}

export default App;
