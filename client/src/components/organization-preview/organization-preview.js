import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionsUser from '../../actions/user';

import './organization-preview.css';

export class OrganizationPreview extends Component {
  handleClick(id) {
    this.props.dispatch(actionsUser.fetchUser(
      id,
      this.props.user.authToken,
      'userViewed'
    ))
  }

  // also available: locationCity, locationState, links, causes

  render() {
    return (
      <div className='organizationPreview' onClick={() => this.handleClick(this.props.user.id)}>
        <img className='logo' src={this.props.user.logo} alt={`${this.props.user.organization} logo`}></img>        <h3 className='organization'>{this.props.user.organization}</h3>
        <p className='bio'>{this.props.user.bio}</p>
      </div>
    )
  }
}

export default connect()(OrganizationPreview);