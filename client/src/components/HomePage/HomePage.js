import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import OrganizationPreview from '../organizationPreview/organizationPreview';
import ContributorPreview from '../ContributorPreview/ContributorPreview';


export class HomePage extends Component {
  render() {
    let previews = typeof this.props.usersList !== 'object' ? '' : this.props.usersList.map((user, key) => (
      <Link to={`/profiles/${user.id}`}>
        <OrganizationPreview user={user} key={key} />
      </Link>
        )
      );

    return (
      <div>
        {previews}
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
export default connect(mapStateToProps)(HomePage);