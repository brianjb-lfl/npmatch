import React, { Component } from 'react';
import { connect } from 'react-redux';
import './user-profile.css';
import OpportunityPreview from '../opportunity-preview/opportunity-preview';
import RolePreview from '../role-preview/role-preview';
import AdminAdd from '../admin-add/admin-add';
import UserFollow from '../user-follow/user-follow';
import * as actionsOpportunity from '../../actions/opportunity';
import * as actionsDisplay from '../../actions/display';
import * as actionsUser from '../../actions/user';

export class UserProfile extends Component {

  createOpportunity(){
    this.props.dispatch(actionsOpportunity.loadOpportunity({}));
    this.props.history.push('/opportunities/create');
  }

  editProfile() {
    this.props.dispatch(actionsDisplay.changeDisplay('editProfile'));
    this.props.history.push(`/profiles/${this.props.user.id}/edit`)
  }

  render() {

    let self, user, opportunityHeader, responseHeader, followingHeader, adminsHeader, adminOfHeader, userFollow;
    if (this.props.display.userId === this.props.user.id) {
      self = true;
      user = this.props.user;
      opportunityHeader = 'My Opportunities';
      responseHeader = 'My Responses';
      followingHeader = 'I Am Following';
      adminsHeader = 'Site Admins';
      userFollow = '';
    } else {
      self = false;
      user = this.props.userViewed;
      opportunityHeader = user.userType === 'organization' ? `${user.organization}'s Opportunities` : `${user.firstName}'s Opportunities`;
      responseHeader = '';
      followingHeader = '';
      adminsHeader = '';
      userFollow = this.props.user.id ? <UserFollow id={user.id} /> : '' ;
    }

    let editProfileButton = self ? <i onClick={()=>this.editProfile()} className="fa fa-pencil editPencil" aria-hidden="true"></i> : null ;

    let opportunityPreviews = [];
    if (typeof user.opportunities === 'object') {
      let key = 1
      for (let prop in user.opportunities) {
        // self = true if user owns opportunities
        opportunityPreviews.push(<OpportunityPreview self={self} opportunity={user.opportunities[prop]} key={key} history={this.props.history} />)
        key += 1;
      }
    }

    const opportunities = opportunityPreviews.length > 0 && user.id ?
    <div className='previewCardListContainer'>
      <h3 className='profileSectionHeaders'>{opportunityHeader}</h3>
      {opportunityPreviews}
    </div> : '' ;

    const addOpportunityButton = self ? <button className='addOpportunityButton' onClick={()=>this.createOpportunity()}>Add Opportunity</button> : '' ;

    let responsePreviews = [];
    if (typeof user.responses === 'object' && self) {
      let key = 1
      for (let prop in user.responses) {
        let opportunity = { ...user.responses[prop], id: user.responses[prop].idOpportunity }
        // self should always be false for responses, even if user owns opportunity
        if (user.responses[prop].responseStatus !== 'deleted') {
          responsePreviews.push(<OpportunityPreview self={false} response={user.responses[prop]} opportunity={opportunity} key={key} history={this.props.history} />)
          key += 1;
        }
      }
    }

    const responses = responsePreviews.length > 0 ?
    <div className='previewCardListContainer'>
    <h3 className='profileSectionHeaders'>{responseHeader}</h3>
      {responsePreviews}
    </div> : '' ;

    let adminOfPreviews = [];
    if (typeof user.adminOf === 'object' && self) {
      let key = 1
      for (let prop in user.adminOf) {
        // self should always be true for following
        adminOfPreviews.push(<RolePreview role={user.adminOf[prop]} roleType='adminOf' key={key} index={key} history={this.props.history}/>) 
        key += 1;
      }
    }

    let adminOf = '';
      if (adminOfPreviews.length > 0){
      adminOfHeader = 'I am an Admin of'
      adminOf = <div className='previewCardListContainer'>
      <h3 className='profileSectionHeaders'>{adminOfHeader}</h3>
      {adminOfPreviews}
    </div>
    }

    let followingPreviews = [];
    if (typeof user.following === 'object' && self) {
      let key = 1
      for (let prop in user.following) {
        // self should always be true for following
        followingPreviews.push(<RolePreview role={user.following[prop]} roleType='following' key={key} index={key} history={this.props.history}/>) 
        key += 1;
      }
    }

    const following = followingPreviews.length > 0 ?
    <div className='previewCardListContainer'>
      <h3 className='profileSectionHeaders'>{followingHeader}</h3>
      {followingPreviews}
    </div> : '' ;


    let adminPreviews = [];
    if (typeof user.admins === 'object' && self) {
      let key = 1
      for (let prop in user.admins) {
        // self should always be true for following
        adminPreviews.push(<RolePreview role={user.admins[prop]} roleType='admin' initialValues={user.admins[prop]} key={key} index={key} history={this.props.history}/>) 
        key += 1;
      }
    }

    let admins = null;
    if (adminPreviews.length > 0){
      admins = <div className='previewCardListContainer'>
      <h3 className='profileSectionHeaders'>{adminsHeader}</h3>
      {adminPreviews}
    </div>
    } else if (user.userType === 'organization' && self) {
      admins = <div className='addAdminMessage'>
        There are no site admins. You can add an admin by searching users below.
      </div>;
    }

    const adminAdd = (user.userType === 'organization' && self) ? <AdminAdd/> : '' ;

    let userSearchPreviews = [];
    if (this.props.display.view === 'addAdmin' && self) {
      if(Array.isArray(this.props.usersList.main)) {
        this.props.usersList.main.forEach((user,index)=>{
          if (!(this.props.user.admins[user.id])){
            userSearchPreviews.push(<RolePreview user={user} roleType='admin' key={index} index={index+100} history={this.props.history}/>) 
          }
        })
      }
    }
    
    const userSearches = userSearchPreviews.length > 0 ?
    <div className='previewCardListContainer'>
      <h3 className='profileSectionHeaders'>Search Results</h3>
      {userSearchPreviews}
    </div> : '' ;

    const links = user.links.map((link, index) => {
      return <a className='linkIcon' href={link.linkUrl} key={index} target={'_blank'}>
        <i className="fa fa-globe" aria-hidden="true"></i>
      </a>
    })
    const linksList = <div className='linksList'>{links}</div>
    const causes = Array.isArray(user.causes) ? user.causes.map((cause, index)=>{
      return <li key={index} className='causeIcon'>{cause}</li>
    }) : '' ;
    const skills = Array.isArray(user.skills) ? user.skills.map((skill, index)=>{
      return <li key={index} className='skillIcon'>{skill}</li>
    }) : '' ;

    const userProfile = user.id ? 
      <div className='previewCard'>
        <div className='userProfileHeaderContainer'>
          <img className='userProfileLogo' src={user.logo} alt={`${user.displayName}`}></img>
          <h3 className='userProfileName'>{user.displayName}</h3>
        </div>
        <div className='userProfileInner'>
          {editProfileButton}
          <h4 className='previewCardText'>{actionsUser.formattedLocation(user.locationCity, user.locationState)}</h4>
          <p className='previewCardText'>{user.bio}</p>
          <p className='previewCardText'>Availability: {user.availability}</p>
          {linksList}
          <ul className='causesList'>{causes}</ul>
          <ul className='skillsList' style={{marginTop: '10px'}}>{skills}</ul>
        </div>
        {userFollow}
      </div> :
      <h3 className='profileSectionHeaderss'>Sorry, user not found</h3>;

    return (
      <main>
        {userProfile}
        {adminOf}
        {opportunities}
        {addOpportunityButton}
        {responses}
        {following}
        {admins}
        {adminAdd}
        {userSearches}
      </main>
    );
  }
}

export const mapStateToProps = state => ({
  user: state.user,
  userViewed: state.userViewed,
  display: state.display,
  usersList: state.usersList,
})
export default connect(mapStateToProps)(UserProfile);