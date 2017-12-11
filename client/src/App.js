import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import LandingPage from './components/LandingPage/LandingPage';
import UserProfile from './components/UserProfile/UserProfile';

export class App extends Component {
  render() {
    console.log('App', this.props.users);
    let renderPage;
    if (this.props.login === 'true') {
      renderPage = HomePage;
    }
    else renderPage = LandingPage;
    return (
      <Router>
        <div>
          {/* <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div> */}

          <Route exact path="/" component={renderPage} />
          <Route path="/:id" component={UserProfile} />
        </div>
      </Router>
    );
  }
}

export const mapStateToProps = state => ({
  user: state.user,
  userViewed: state.userViewed,
  usersList: state.usersList,
  opportunity: state.opportunity,
  opportunitiesList: state.opportunitiesList,
  display: state.display,
})
export default connect(mapStateToProps)(App);
