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

  render() {
    return (
      <div className='organizationPreview' onClick={() => this.handleClick(this.props.user.id)}>
        <img className='logo' src={'https://image.freepik.com/free-icon/apple-logo_318-40184.jpg'} alt={`${this.props.user.organization} logo`}></img>        <h3 className='organization'>{this.props.user.organization}</h3>
        <p className='bio'>{this.props.user.bio}</p>
      </div>
    )
  }
}

export default connect()(OrganizationPreview);