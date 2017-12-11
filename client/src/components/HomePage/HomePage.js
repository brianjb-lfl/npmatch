import React, { Component } from 'react';
import { connect } from 'react-redux';

import TopNavBar from '../TopNavBar/TopNavBar';
import BottomNavBar from '../BottomNavBar/BottomNavBar';
import OrganizationPreview from '../OrganizationPreview/OrganizationPreview';
import ContributorPreview from '../ContributorPreview/ContributorPreview';


export default class HomePage extends Component {

  render() {
    let previews;
    if (this.props.userType === 'individual') {
      previews = this.props.opportunities.map((opp, key) => {
        return (
          <OrganizationPreview />
        )
      })
    }
    else previews = <ContributorPreview />

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