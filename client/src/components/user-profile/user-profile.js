import React, { Component } from 'react';
import { connect } from 'react-redux';

import './user-profile.css';
import OpportunityPreview from '../opportunity-preview/opportunity-preview';

export class UserProfile extends Component {

  render() {
    const user = this.props.user;

    let opportunityPreviews = typeof user.opportunities !== 'object' ? null : user.opportunities.map((opp, key) => (
      <OpportunityPreview opportunity={opp} key={key} />
    )
    );

    return (
      <main>
        <div className='userProfile'>
          <img src={user.logo} alt={`${user.firstName}${user.lastName}${user.organization}`}></img>
          <h3 className='name'>{user.username}{user.firstName}{user.lastName}{user.organization}</h3>
          <h4 className='location'>{this.props.locationCity}, {user.locationState}, {user.locationCountry}</h4>
          <p className='bio'>{user.bio}</p>
          <p className='availability'>{user.availability}</p>
          <p className='links'>{user.links.join(', ')}</p>
          <p className='causes'>{user.causes.join(', ')}</p>
          <p className='skills'>{user.skills.join(', ')}</p>
        </div>
        <div className='opportunities'>
          {opportunityPreviews}
        </div>
      </main>
    );
  }
}

export const mapStateToProps = state => {
  const user = state.display.view === 'selfProfile' || 'profileEdit' ? state.user : state.userViewed;
  return {
    user,
    display: state.display
  }
}
export default connect(mapStateToProps)(UserProfile);