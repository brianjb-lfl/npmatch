import React, { Component } from 'react';
import { connect } from 'react-redux';

export default class DetailedOrganizationPreview extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <img src={this.props.logo}></img>
        <h3>{this.props.name}</h3>
        <p>{this.props.description}</p>
        <p>{this.props.causes}</p>
        <p>{this.props.skillsSought}</p>
        <p>{this.props.upcomingProjects}</p>
      </div>
    )
  }
}