import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';

class App extends Component {
  render() {
    console.log('App',this.props.users);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  user: state.users,
  userViewed: state.userViewed,
  usersList: state.usersList,
  opportunity: state.opportunity,
  opportunitiesList: state.opportunitiesList,
})
export default connect(mapStateToProps)(App);
