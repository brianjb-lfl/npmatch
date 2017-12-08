import React, { Component } from 'react';
import { connect } from 'react-redux';

export default class OrganizationPreview extends Component {

  render() {
    return (
      <div>
        <img className='logo' src={this.props.logo}></img>
        <h3 className='name'>{this.props.name}</h3>
        <p className='description'>{this.props.description}</p>
      </div>
    )
  }
}