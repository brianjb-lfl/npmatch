import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';
import * as actionsGeneral from './actions/general';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
// import LandingPage from './components/LandingPage/LandingPage';
import UserProfile from './components/UserProfile/UserProfile';
import ExplorePage from './components/ExplorePage/ExplorePage';
import TopNavBar from './components/TopNavBar/TopNavBar';
import BottomNavBar from './components/BottomNavBar/BottomNavBar';

export class App extends Component {

  componentDidMount() {
    this.props.dispatch(actionsGeneral.fetchInitialize());
  }

  render() {
    console.log('App', this.props.users);
    let renderPage;
    if (this.props.login === 'true') {
      renderPage = HomePage;
    }
    else renderPage = HomePage;
    return (
      <Router>
        <div>
          <Route exact path="/" component={renderPage} />
          <Route path="/:id" component={UserProfile} />
          {/* <Route path="/register" component={RegisterPage} /> */}
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
})
export default connect(mapStateToProps)(App);
