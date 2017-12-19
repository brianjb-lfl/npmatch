import React, { Component } from 'react';
import { connect } from 'react-redux';

import './user-profile.css';
import OpportunityPreview from '../opportunity-preview/opportunity-preview';

export class UserProfile extends Component {

  render() {
    const user = this.props.user;

    let opportunityPreviews = typeof user.opportunities !== 'object' ? '' : user.opportunities.map((opp, key) => (
      <OpportunityPreview opportunity={opp} key={key} />
    )
    );

    return (
      <main>
        <div className='userProfile'>
          <img src={user.logo} alt={`${user.firstName}${user.lastName}${user.organization}`}></img>
          <h3>{user.username}{user.firstName}{user.lastName}{user.organization}</h3>
          <h4>{this.props.locationCity}{user.locationState}{user.locationCountry}</h4>
          <p>{user.bio}</p>
          <p>{user.availability}</p>
          <p>{user.links.join(', ')}</p>
          <p>{user.causes.join(', ')}</p>
          <p>{user.skills.join(', ')}</p>
        </div>
        {opportunityPreviews}
      </main>
    );
  }
}

export const mapStateToProps = state => {
  const user = state.display.view === 'selfProfile' || 'profileEdit' ? state.user : state.userViewed ;
  return {
    user,
    display: state.display
  }
}
export default connect(mapStateToProps)(UserProfile);