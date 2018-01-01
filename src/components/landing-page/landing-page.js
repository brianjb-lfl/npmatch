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
        return <OrganizationPreview user={user} key={key} history={this.props.history}/> 
      } else {
        return null;
      }
      }) : '' ;

    return (
      <div className='landingPage'>
        <h2>Causeway</h2>
        <p className='appDescription'>
          Welcome to our amazing web application! 
          This will likely be the best experience you ever have using an app. Get ready...
        </p>
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