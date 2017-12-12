import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import TopNavBar from '../TopNavBar/TopNavBar';
import BottomNavBar from '../BottomNavBar/BottomNavBar';
import DetailedOrganizationPreview from '../DetailedOrganizationPreview/DetailedOrganizationPreview';
import DetailedContributorPreview from '../DetailedContributorPreview/DetailedContributorPreview';


export class ExplorePage extends Component {

  render() {
    let previews = this.props.usersList.map((user, key) => (
      <Link to={`/profiles/${user.id}`}>
        <DetailedOrganizationPreview user={user} key={key} />
      </Link>
    )
    );

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

export const mapStateToProps = state => ({
  user: state.user,
  userViewed: state.userViewed,
  usersList: state.usersList.main,
  opportunity: state.opportunity,
  opportunitiesList: state.opportunitiesList,
  display: state.display,
})
export default connect(mapStateToProps)(ExplorePage);