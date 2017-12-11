import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionsUser from '../../actions/user';
import { BrowserRouter as Router, Route } from 'react-router-dom';

export class OrganizationPreview extends Component {
  handleClick(id) {
    this.props.dispatch(actionsUser.fetchUser(
      id,
      this.props.user.authToken,
      'orgs',
      'userViewed'
    ))
      .then(() => {
        this.props.history.push(`/${id}`)
      })
  }

  render() {
    return (
      <div onClick={() => this.handleClick(this.props.user.id)}>
        <img className='logo' src={this.props.user.logo}></img>
        <h3 className='organization'>{this.props.user.organization}</h3>
        <p className='bio'>{this.props.user.bio}</p>
      </div>
    )
  }
}

export const mapStateToProps = state => ({
  userViewed: state.userViewed,
  usersList: state.usersList,
  opportunity: state.opportunity,
  opportunitiesList: state.opportunitiesList,
  display: state.display
})
export default connect(mapStateToProps)(OrganizationPreview);