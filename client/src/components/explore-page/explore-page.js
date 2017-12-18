import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import DetailedOrganizationPreview from '../detailed-organization-preview/detailed-organization-preview';
import DetailedContributorPreview from '../detailed-contributor-preview/detailed-contributor-preview';


export class ExplorePage extends Component {

  render() {
    let previews;
    if (this.props.display === 'exploreOrganizations') {
      previews = this.props.usersList.map((user, key) => (
        <Link to={`/profiles/${user.id}`}>
          <DetailedOrganizationPreview user={user} key={key} />
        </Link>
      )
      )
    }
    else {
      previews = this.props.usersList.map((user, key) => (
        <Link to={`/profiles/${user.id}`}>
          <DetailedContributorPreview user={user} key={key} />
        </Link>
      )
      )
    }

    return (
      <main>
        {previews}
      </main>
    )
  }
}

export const mapStateToProps = state => ({
  user: state.user,
  userViewed: state.userViewed,
  usersList: state.usersList,
  opportunity: state.opportunity,
  opportunitiesList: state.opportunitiesList,
  display: state.display.view,
})
export default connect(mapStateToProps)(ExplorePage);