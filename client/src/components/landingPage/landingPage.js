import React, { Component } from 'react';
import { connect } from 'react-redux';

import TopNavBar from '../TopNavBar/TopNavBar';
import BottomNavBar from '../BottomNavBar/BottomNavBar';
import OrganizationPreview from '../OrganizationPreview/OrganizationPreview';

export default class LandingPage extends Component {

  render() {
    return (
      <div>
        <TopNavBar />
        <p>Hello world!</p>
        <OrganizationPreview />
        <OrganizationPreview />
      </div>
    )
  }
}