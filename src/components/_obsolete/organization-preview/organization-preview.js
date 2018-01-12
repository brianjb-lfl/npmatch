import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionsUser from '../../actions/user';
import UserFollow from '../user-follow/user-follow';
import './organization-preview.css';

export class OrganizationPreview extends Component {
  handleClick(id) {
    this.props.dispatch(actionsUser.fetchUser(
      id,
      this.props.user.authToken,
      'userViewed'
    ))
    .then(()=>{
      this.props.history.push(`/profiles/${this.props.user.id}`)
    })
  }

  // also available: locationCity, locationState, links, causes

  render() {

    const userFollow = (this.props.userInState.id && this.props.userInState.id !== this.props.user.id) ?
       <UserFollow id={this.props.user.id} /> : '' ;

    const causes = Array.isArray(this.props.user.causes) ? this.props.user.causes.map((cause, index)=>{
      return <li key={index} className='causeIcon'>{cause}</li>
    }) : '' ;

    return (
      <div className='organizationPreview' >
        <div className='organizationPreviewInner'onClick={() => this.handleClick(this.props.user.id)}>
          <img className='logo' src={this.props.user.logo} alt={`${this.props.user.organization} logo`}></img>        
          <div className='organizationText'>
            <h3 className='organization'>{this.props.user.organization}</h3>
            <p className='bio'>{this.props.user.bio}</p>
            <p className='bio'>{[this.props.user.locationCity, this.props.user.locationState].join(', ')}</p>
          </div>
        </div>
        <div className='previewBottomBar'>
          <ul className='causesList'>{causes}</ul>
          {userFollow}
        </div>
      </div>
    )
  }
}
export const mapStateToProps = state => ({
  userInState: state.user,
})
export default connect(mapStateToProps)(OrganizationPreview);