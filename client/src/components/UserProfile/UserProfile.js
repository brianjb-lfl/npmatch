import React, { Component } from 'react';
import { connect } from 'react-redux';
import TopNavBar from '../TopNavBar/TopNavBar';

export default class UserProfile extends Component {

  render() {
    return (
      <TopNavBar />
      <div>
        <img src={this.props.logo}></img>
        <h3>{this.props.name}</h3>
        <h4>{this.props.locationCity}, {this.props.locationState}</h4>
        <p>{this.props.description}</p>
      </div>
    )
  }
}