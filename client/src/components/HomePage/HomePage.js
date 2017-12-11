import React, { Component } from 'react';
import { connect } from 'react-redux';

import TopNavBar from '../TopNavBar/TopNavBar';
import BottomNavBar from '../BottomNavBar/BottomNavBar';
import OrganizationPreview from '../OrganizationPreview/OrganizationPreview';
import ContributorPreview from '../ContributorPreview/ContributorPreview';


export default class HomePage extends Component {

  render() {
    let previews;
    if(this.props.userType === 'individual') {
      previews = <OrganizationPreview />
    }
    else previews = <ContributorPreview />

    return (
      <div>
        <TopNavBar />
        {previews}
        <BottomNavBar />
      </div>
    )
  }
}