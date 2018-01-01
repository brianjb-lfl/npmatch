import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionsUser from '../../actions/user';
import UserFollow from '../user-follow/user-follow';

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

    const userFollow = (this.props.userInState.id && this.props.userInState.id !== this.props.user.id) ?
    <UserFollow id={this.props.user.id} /> : '' ;

    return (
      <div className='contributorPreview'>
        <div className='contributorPreviewInner' onClick={() => this.handleClick(this.props.user.id)}>
          <img className='logo' src={this.props.user.logo}></img>
          <h3 className='name'>{this.props.user.name}</h3>
          <p className='bio'>{this.props.user.bio}</p>
        </div>
        {userFollow}
      </div>
    )
  }
}

export const mapStateToProps = state => ({
  userInState: state.user,
})
export default connect(mapStateToProps)(ContributorPreview);