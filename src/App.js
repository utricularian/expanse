import React from 'react';
import { Route } from 'react-router-dom';

import SystemsStore from "./stores/SystemsStore";
import SystemObjectsStore from "./stores/SystemObjectsStore";
import Home from "./Home";
import ApiRequest from "./helpers/ApiRequest";

import styles from './App.module.scss';
import './index.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.systemsStore = this.props.systemsStore || new SystemsStore({apiRequest: new ApiRequest()});
    this.systemObjectsStore = this.props.systemObjectsStore || new SystemObjectsStore();

    this.renderHome = this.renderHome.bind(this);
  }

  renderHome() {
    return <Home systemsStore={this.systemsStore}/>
  }

  render() {
    return (
      <div className={styles.App}>
        <Route exact path="/" render={this.renderHome}/>
      </div>
    );
  };
}
