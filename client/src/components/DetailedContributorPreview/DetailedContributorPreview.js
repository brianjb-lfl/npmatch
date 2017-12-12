import React, { Component } from 'react';
import { connect } from 'react-redux';

export class DetailedContributorPreview extends Component {
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
        <img className='logo' src={this.props.opportunity.logo}></img>
        <h3 className='name'>{this.props.opportunity.name}</h3>
        <p className='bio'>{this.props.opportunity.bio}</p>
        <p className='causes'>{this.props.opportunity.causes}</p>
        <p className='skills'>{this.props.opportunity.skills}</p>
        <p className='availability'>{this.props.opportunity.availability}</p>
      </div>
    )
  }
}

export default connect()(DetailedContributorPreview)