import React, { Component } from 'react';
import { connect } from 'react-redux';

export default class OrganizationPreview extends Component {

  render() {
    return (
      <div>
        <img src={this.props.logo}></img>
        <h3>{this.props.name}</h3>
        <p>{this.props.description}</p>
      </div>
    )
  }
}