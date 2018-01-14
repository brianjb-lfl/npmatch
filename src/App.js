import React, { Component } from 'react';
import './App.css';
import 'react-widgets/dist/css/react-widgets.css';
import './components/styles/buttons.css';
import './components/styles/previewCard.css';
import './components/styles/forms.css';
import { connect } from 'react-redux';
import * as actionsGeneral from './actions/general';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import LoginPage from './components/login-page/login-page';
import RegisterPage from './components/register-page/register-page'
import UserProfile from './components/user-profile/user-profile';
import UserProfileEdit from './components/user-profile-edit/user-profile-edit';
import ExplorePage from './components/explore-page/explore-page';
import OpportunityCreate from './components/opportunity-create/opportunity-create';
import NavBarTop from './components/nav-bar-top/nav-bar-top';
import NavBarBottom from './components/nav-bar-bottom/nav-bar-bottom';
import RootPage from './components/root-page/root-page';
import OpportunitiesPage from './components/opportunities-page/opportunities-page';

export class App extends Component {

  componentDidMount() {
    if (this.props.general.causes.length < 1) {
      this.props.dispatch(actionsGeneral.fetchInitialize());
    }
  }

  render() {
    // NOTE: individual components include a redirect if users are not signed in: ExplorePage, OpportunityCreae, OpportunitiesPage, UserProfileEdit
    return (
      <Router>
        <div className='outerContainer'>
          <Switch>
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
            <Redirect from='*' to='/' />
          </Switch>
          <Route path='/*' component={NavBarTop}/>
          <Route path='/*' component={NavBarBottom} />
        </div>
      </Router>
    );
  }
}

export const mapStateToProps = state => ({
  general: state.general
})
export default connect(mapStateToProps)(App);
