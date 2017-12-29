import React, { Component } from 'react';
import { connect } from 'react-redux';

import './user-profile.css';
import OpportunityPreview from '../opportunity-preview/opportunity-preview';
import OpportunityResponse from '../opportunity-response/opportunity-response';

export class UserProfile extends Component {

  render() {
    let self, user, opportunityHeader, responseHeader;
    if (this.props.display.view === 'selfProfile' || this.props.display.view === 'profileEdit' ) {
      self = true;
      user = this.props.user;
      opportunityHeader = 'My Opportunities';
      responseHeader = 'My Responses';
    } else {
      self = false;
      user = this.props.userViewed;
      opportunityHeader = `${user.organization || user.firstName}'s Opportunities`;
      responseHeader = '';
    }

    let opportunityPreviews = [];
    if (typeof user.opportunities === 'object') {
      let key = 1
      for (let prop in user.opportunities) {
        opportunityPreviews.push(<OpportunityPreview self={self} opportunity={user.opportunities[prop]} key={key} />) 
        key += 1;
      }
    }

    let responsePreviews = [];
    if (typeof user.responses === 'object' && self) {
      let key = 1
      for (let prop in user.responses) {
        responsePreviews.push(<OpportunityResponse self={false} response={user.responses[prop]} key={key} />) 
        key += 1;
      }
    }
    
    const opportunities = opportunityPreviews.length > 0 ?
      <div className='opportunities'>
        <h3>{opportunityHeader}</h3>
        {opportunityPreviews}
      </div> : '' ;

    const responses = responsePreviews.length > 0 ?
      <div className='responses'>
      <h3>{responseHeader}</h3>
        {responsePreviews}
      </div> : '' ;

    const links = user.links.map((link,index)=>{
      return <a href={link.linkUrl} key={index} target={'_blank'}>
        <i className="fa fa-globe" aria-hidden="true"></i>
        </a>
    })

    return (
      <main>
        <div className='userProfile'>
          <img className='logo' src={user.logo} alt={`${user.firstName}${user.lastName}${user.organization}`}></img>
          <h3 className='name'>{user.username}{user.firstName}{user.lastName}{user.organization}</h3>
          <h4 className='location'>{user.locationCity}, {user.locationState}, {user.locationCountry}</h4>
          <p className='bio'>{user.bio}</p>
          <p className='availability'>{user.availability}</p>
          {links}
          <p className='causes'>{user.causes.join(', ')}</p>
          <p className='skills'>{user.skills.join(', ')}</p>
        </div>
        {opportunities}
        {responses}
      </main>
    );
  }
}

export const mapStateToProps = state => ({
  user: state.user,
  userViewed: state.userViewed,
  display: state.display,
})
export default connect(mapStateToProps)(UserProfile);