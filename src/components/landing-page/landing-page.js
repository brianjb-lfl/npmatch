import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionsDisplay from '../../actions/display';

import './landing-page.css'

import OrganizationPreview from '../organization-preview/organization-preview';

export class LandingPage extends Component {
  componentDidMount() {
    this.props.dispatch(actionsDisplay.changeDisplay('landingPage'));
  }

  render() {
    let previews = Array.isArray(this.props.usersList) ?
      this.props.usersList.map((user, key) => {
        if (user.userType === 'organization') {
          return <OrganizationPreview user={user} key={key} history={this.props.history} />
        } else {
          return null;
        }
      }) : '';

    return (
      <div className='landingPage'>
        <h2 className='sectionTitle'>Causeway</h2>
        <div className='descriptionContainer'>
          <p>
            Welcome to CauseWay!
          </p>
          <p className='appDescription'>
            With this app, non-profit organizations can connect with volunteers and vice-versa.
          Organizations are able to post information about the causes they supporting and
          upcoming projects that they're looking for support on. Individuals who sign up, listed
          as "contributors" can post their own skills and apply to or volunteer for the projects
          that organizations are posting.
        </p>
        </div>
        {previews}
      </div>
    )
  }
}

export const mapStateToProps = state => ({
  usersList: state.usersList.main,
  display: state.display.view
})
export default connect(mapStateToProps)(LandingPage)