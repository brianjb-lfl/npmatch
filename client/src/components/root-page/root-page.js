import React, { Component } from 'react';
import { connect } from 'react-redux';
import LandingPage from '../landing-page/landing-page';
import HomePage from '../home-page/home-page';
import * as actionsDisplay from '../../actions/display';

export class RootPage extends Component {
  render() {
    let renderPage;
    if (!this.props.user.id) {
      renderPage = <LandingPage />
    }
    else renderPage = <HomePage />

    return (
      <div>
        {renderPage}
      </div>
    )
  }
}

export const mapStateToProps = state => ({
  user: state.user,
  userViewed: state.userViewed,
  usersList: state.usersList.main,
  opportunity: state.opportunity,
  opportunitiesList: state.opportunitiesList,
  display: state.display,
})
export default connect(mapStateToProps)(RootPage);