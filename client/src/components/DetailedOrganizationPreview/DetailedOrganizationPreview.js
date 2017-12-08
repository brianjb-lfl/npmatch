import React, { Component } from 'react';
import { connect } from 'react-redux';

export default class DetailedOrganizationPreview extends Component {

  render() {
    return (
      <div>
        <img className='logo' src={this.props.logo}></img>
        <h3 className='name'>{this.props.name}</h3>
        <p className='description'>{this.props.description}</p>
        <p className='causes'>{this.props.causes}</p>
        <p className='skillsSought'>{this.props.skillsSought}</p>
        <p className='upcomingProjects'>{this.props.upcomingProjects}</p>
      </div>
    )
  }
}