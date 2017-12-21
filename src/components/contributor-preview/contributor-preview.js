import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionsUser from '../../actions/user';

import './contributor-preview.css';

export default class ContributorPreview extends Component {
  handleClick(id) {
    this.props.dispatch(actionsUser.fetchUser(
      id,
      this.props.user.authToken,
      'userViewed'
    ))
  }

  render() {
    return (
      <div className='contributorPreview' onClick={() => this.handleClick(this.props.user.id)}>
        <img className='logo' src={this.props.user.logo}></img>
        <h3 className='name'>{this.props.user.name}</h3>
        <p className='bio'>{this.props.user.bio}</p>
      </div>
    )
  }
}