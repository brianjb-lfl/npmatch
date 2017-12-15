import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionsUser from '../../actions/user';

export class DetailedContributorPreview extends Component {
  handleClick(id) {
    this.props.dispatch(actionsUser.fetchUser(
      id,
      this.props.user.authToken,
      'users',
      'userViewed'
    ))
  }

  render() {
    return (
      <div onClick={() => this.handleClick(this.props.user.id)}>
        <img className='logo' src={this.props.user.logo} alt={this.props.user.firstName}></img>
        <h3 className='name'>{this.props.user.name}</h3>
        <p className='bio'>{this.props.user.bio}</p>
        <p className='causes'>{this.props.user.causes.join(', ')}</p>
        {/* <p className='skills'>{this.props.user.skills.join(', ')}</p> */}
        <p className='availability'>{this.props.user.availability}</p>
      </div>
    )
  }
}

export default connect()(DetailedContributorPreview)