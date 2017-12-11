import React, { Component } from 'react';
import { connect } from 'react-redux';

import TopNavBar from '../TopNavBar/TopNavBar';
import OpportunityPreview from '../OpportunityPreview/OpportunityPreview';
import BottomNavBar from '../BottomNavBar/BottomNavBar';

export default class UserProfile extends Component {

  render() {
    return (
      <div>
        <TopNavBar />
        <div>
          <img src={this.props.logo}></img>
          <h3>{this.props.name}</h3>
          <h4>{this.props.locationCity}, {this.props.locationState}</h4>
          <p>{this.props.description}</p>
        </div>
        <OpportunityPreview />
        <BottomNavBar
          leftLink='https://localhost:3000/organizations'
          leftAltText='View Organizations Button'
          leftLabel='Organizations'
          rightLink='https://localhost:3000/contributors'
          rightAltText='View Contributors Button'
          rightLabel='Contributors'
        />
      </div>
    );
  }
}