import React, { Component } from 'react';
import { connect } from 'react-redux';

import './user-profile.css';
import OpportunityPreview from '../opportunity-preview/opportunity-preview';
import RolePreview from '../role-preview/role-preview';

export class UserProfile extends Component {

  render() {
    let self, user, opportunityHeader, responseHeader, followingHeader, adminHeader;
    if (this.props.display.view === 'selfProfile' || this.props.display.view === 'profileEdit' ) {
      self = true;
      user = this.props.user;
      opportunityHeader = 'My Opportunities';
      responseHeader = 'My Responses';
      followingHeader = 'I Am Following';
      adminHeader = 'I Am Admin Of';
    } else {
      self = false;
      user = this.props.userViewed;
      opportunityHeader = `${user.organization || user.firstName}'s Opportunities`;
      responseHeader = '';
      followingHeader = '';
      adminHeader = '';
    }

    let opportunityPreviews = [];
    if (typeof user.opportunities === 'object') {
      let key = 1
      for (let prop in user.opportunities) {
        // self = true if user owns opportunities
        opportunityPreviews.push(<OpportunityPreview self={self} opportunity={user.opportunities[prop]} key={key} history={this.props.history}/>) 
        key += 1;
      }
    }

    let responsePreviews = [];
    if (typeof user.responses === 'object' && self) {
      let key = 1
      for (let prop in user.responses) {
        let opportunity = {...user.responses[prop], id: user.responses[prop].idOpportunity}
        // self should always be false for responses, even if user owns opportunity
        responsePreviews.push(<OpportunityPreview self={false} response={user.responses[prop]} opportunity={opportunity} key={key} history={this.props.history}/>) 
        key += 1;
      }
    }

    let followingPreviews = [];
    if (typeof user.following === 'object' && self) {
      let key = 1
      for (let prop in user.following) {
        // self should always be true for following
        followingPreviews.push(<RolePreview self={true} role={user.following[prop]} key={key} history={this.props.history}/>) 
        key += 1;
      }
    }

    let adminPreviews = [];
    if (typeof user.admins === 'object' && self) {
      let key = 1
      for (let prop in user.admins) {
        // self should always be true for following
        adminPreviews.push(<RolePreview self={true} role={user.admin[prop]} key={key} history={this.props.history}/>) 
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


    const following = followingPreviews.length > 0 ?
      <div className='following'>
        <h3>{followingHeader}</h3>
        {followingPreviews}
      </div> : '' ;

    const admins = adminPreviews.length > 0 ?
      <div className='admins'>
        <h3>{adminHeader}</h3>
        {adminPreviews}
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
        {followingPreviews}
        {adminPreviews}
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