import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actionsDisplay from '../../actions/display';

import './landing-page.css'

import OrganizationPreview from '../organization-preview/organization-preview';

export class LandingPage extends Component {
  componentDidMount() {
    this.props.dispatch(actionsDisplay.changeDisplay('landingPage'));
  }

  render() {
    let previews = typeof this.props.usersList !== 'object' ? '' : this.props.usersList.map((user, key) => (
      <Link to={`/profiles/${user.id}`} key={key} >
        <OrganizationPreview user={user} /> 
      </Link>
    )
    );

    return (
      <div className='landingPage'>
        <p>
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