import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionsUser from '../../actions/user';

export class DetailedOrganizationPreview extends Component {
  handleClick(id) {
    this.props.dispatch(actionsUser.fetchUser(
      id,
      this.props.user.authToken,
      'orgs',
      'userViewed'
    ))
  }

  render() {
    return (
      <div onClick={() => this.handleClick(this.props.user.id)}>
        <img className='logo' src={this.props.user.logo}></img>
        <h3 className='name'>{this.props.user.name}</h3>
        <p className='bio'>{this.props.user.description}</p>
        <p className='causes'>{this.props.user.causes}</p>
        <p className='skillsSought'>{this.props.user.skillsSought}</p>
        <p className='upcomingProjects'>{this.props.user.upcomingProjects}</p>
      </div>
    )
  }
}

export default connect()(DetailedOrganizationPreview);