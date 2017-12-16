import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';
import * as actionsGeneral from './actions/general';
// import * as actionsDisplay from './actions/display';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import LoginPage from './components/login-page/login-page';
import RegisterPage from './components/register-page/register-page'
// import HomePage from './components/home-page/home-page';
// import LandingPage from './components/landing-page/landing-page';
import UserProfile from './components/user-profile/user-profile';
import UserProfileEdit from './components/user-profile-edit/user-profile-edit';
import ExplorePage from './components/explore-page/explore-page';
import OpportunityCreate from './components/opportunity-create/opportunity-create';
import TopNavBar from './components/top-nav-bar/top-nav-bar';
import BottomNavBar from './components/bottom-nav-bar/bottom-nav-bar';
import RootPage from './components/root-page/root-page';
import OpportunitiesPage from './components/opportunities-page/opportunities-page';

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
          <Route exact path="/profiles/:id" component={UserProfile} />
          <Route exact path="/profiles/:id/edit" component={UserProfileEdit} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/organizations" component={ExplorePage} />
          <Route exact path="/contributors" component={ExplorePage} />
          <Route exact path="/opportunities/create" component={OpportunityCreate} />
          <Route exact path="/myopportunities" component={OpportunitiesPage} />
          
          {/* <Route path="/inbox" component={InboxPage} />
          <Route path="/settings" component={SettingsPage} /> */}
          {/* <Redirect from='*' to='/' /> */}
          <Route path='/*' component={TopNavBar} />
          <Route path='/*' component={BottomNavBar} />
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
