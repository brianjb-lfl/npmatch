import React, { Component } from 'react';
import { connect } from 'react-redux';

export default class UserProfile extends Component {

  render() {
    return (
      <div>
        <img src={this.props.logo}></img>
        <h3>{this.props.name}</h3>
        <h4>{this.props.locationCity}, {this.props.locationState}</h4>
        <p>{this.props.description}</p>
      </div>
    )
  }
}