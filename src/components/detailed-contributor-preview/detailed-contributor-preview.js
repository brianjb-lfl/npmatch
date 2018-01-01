import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionsUser from '../../actions/user';
import UserFollow from '../user-follow/user-follow';

import './detailed-contributor-preview.css';

export class DetailedContributorPreview extends Component {
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
      <div className='detailedContributorPreview'>
        <div className='detailedContributorPreviewInner' onClick={() => this.handleClick(this.props.user.id)}>
          <img className='logo' src={this.props.user.logo} alt={this.props.user.firstName}></img>
          <h3 className='name'>{this.props.user.name}</h3>
          <p className='bio'>{this.props.user.bio}</p>
          {/* <p className='causes'>{this.props.user.causes.join(', ')}</p> */}
          {/* <p className='skills'>{this.props.user.skills.join(', ')}</p> */}
          <p className='availability'>{this.props.user.availability}</p>
        </div>
        {userFollow}
      </div>
      )
  }
}
export const mapStateToProps = state => ({
  userInState: state.user,
})
export default connect(mapStateToProps)(DetailedContributorPreview)