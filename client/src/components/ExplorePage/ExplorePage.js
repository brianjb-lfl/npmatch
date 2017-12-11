import React, { Component } from 'react';
import { connect } from 'react-redux';

import TopNavBar from '../TopNavBar/TopNavBar';
import BottomNavBar from '../BottomNavBar/BottomNavBar';
import DetailedOrganizationPreview from '../DetailedOrganizationPreview/DetailedOrganizationPreview';
import DetailedContributorPreview from '../DetailedContributorPreview/DetailedContributorPreview';


export default class ExplorePage extends Component {

  render() {
    let previews;
    if (this.props.userType === 'individual') {
      previews = this.props.opportunities.map((opp, key) => {
        return (
          <DetailedOrganizationPreview />
        )
      })
    }
    else previews = <DetailedContributorPreview />

    return (
      <div>
        <TopNavBar />
        {previews}
        <BottomNavBar
          leftLink='https://localhost:3000/organizations'
          leftAltText='View Organizations Button'
          leftLabel='Organizations'
          rightLink='https://localhost:3000/contributors'
          rightAltText='View Contributors Button'
          rightLabel='Contributors'
        />
      </div>
    )
  }
}