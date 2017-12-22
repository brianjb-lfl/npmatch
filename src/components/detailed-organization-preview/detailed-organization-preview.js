import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionsUser from '../../actions/user';

import './detailed-organization-preview.css';

export class DetailedOrganizationPreview extends Component {
  handleClick(id) {
    this.props.dispatch(actionsUser.fetchUser(
      id,
      this.props.user.authToken,
      'userViewed'
    ))
  }

  render() {

    return (
      <div className='detailedOrganizationPreview' onClick={() => this.handleClick(this.props.user.id)}>
        <img className='logo' src={this.props.user.logo} alt={`${this.props.user.organization} logo`}></img>        
        <div className='organizationText'>
          <h3 className='organization'>{this.props.user.organization}</h3>
          <p className='bio'>{this.props.user.bio}</p>
          <p className='bio'>{[this.props.user.locationCity, this.props.user.locationState].join(', ')}</p>
          <p className='bio'>{this.props.user.causes.join(', ')}</p>
        </div>
      </div>
    )
  }
}

export default connect()(DetailedOrganizationPreview);