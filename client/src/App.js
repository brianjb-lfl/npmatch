import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';
import * as actionsGeneral from './actions/general';
// import * as actionsDisplay from './actions/display';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import LoginPage from './components/login-page/login-page';
import RegisterPage from './components/register-page/register-page'
// import HomePage from './components/home-page/home-page';
// import LandingPage from './components/landing-page/landing-page';
import UserProfile from './components/user-profile/user-profile';
import ExplorePage from './components/explore-page/explore-page';
import TopNavBar from './components/top-nav-bar/top-nav-bar';
import BottomNavBar from './components/bottom-nav-bar/bottom-nav-bar';
import RootPage from './components/root-page/root-page';

export class App extends Component {

  componentDidMount() {
    if (this.props.general.causes.length < 1) {
      console.log('called')
      this.props.dispatch(actionsGeneral.fetchInitialize());
    }
  }

  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={RootPage} />
          <Route path="/:id" component={UserProfile} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/organizations" component={ExplorePage} />
          <Route path="/contributors" component={ExplorePage} />
          {/* <Route path="/inbox" component={InboxPage} />
          <Route path="/settings" component={SettingsPage} /> */}
          <Route component={TopNavBar} />
          <Route component={BottomNavBar} />
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
  general: state.general
})
export default connect(mapStateToProps)(App);
