import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Redirect } from 'react-router-dom';
import * as actionsOpportunity from '../../actions/opportunity';
import * as actionsDisplay from '../../actions/display';
import OpportunityResponse from '../opportunity-response/opportunity-response';
import { type } from 'os';
import { link } from 'fs';

export class OpportunityPreview extends Component {
  // props from parent: self(boolean for in context of user viewing own opportunities), response, opportunity, history

  editOpportunity(id) {
    this.props.dispatch(actionsOpportunity.fetchOpp(id, this.props.user.authToken))
      .then(() => {
        this.props.history.push('/opportunities/create');
        window.scrollTo(0,0);
      });
  }

  focusOpportunity(id) {
    this.props.dispatch(actionsDisplay.toggleOpportunity(id));
  }

  render() {
    const opportunity = this.props.opportunity;
    const displayName = this.props.opportunity.organization ? this.props.opportunity.organization : `${this.props.opportunity.firstName} ${this.props.opportunity.lastName}`;
    const logo = opportunity.logo ? opportunity.logo : 'https://mave.me/img/projects/full_placeholder.png' ;

    const causes = Array.isArray(opportunity.causes) ? opportunity.causes.map((cause, index)=>{
      return <li key={index} className='causeIcon'>{cause}</li>
    }) : '' ;
    const isInFocus = this.props.display.idOpportunity === opportunity.id ? true : false ;
    const isMyOpportunity = (opportunity.userId === this.props.user.id || this.props.self) ? true : false;
    
    const displayNameTitle = isMyOpportunity ? <h3 className='previewCardTitle'>This is my event!</h3> : <h3 className='previewCardTitle'>{displayName}</h3>
    
    let narrative = null;
    if (isInFocus && opportunity.narrative) {
      narrative = <p className='previewCardText oppNarrative'>{opportunity.narrative}</p>;
    } else if (opportunity.narrative) {
      if (opportunity.narrative.length > 100) {
        narrative = <p className='previewCardText oppNarrative'>{opportunity.narrative.substring(0,90)}...</p>;
      } else {
      narrative = <p className='previewCardText oppNarrative'>{opportunity.narrative}</p>;
      }
    }
    const requiredSkills = (isInFocus && opportunity.requiredSkills) ? <h4 className='previewCardText oppRequiredSkills'>{opportunity.requiredSkills}</h4> : null ;
    
    const timeframe = (isInFocus && (opportunity.timestampStart || opportunity.timestampEnd) ) ?
      <p className='previewCardText oppTimeframe'>{opportunity.timestampStart} to {opportunity.timestampEnd}</p> : null ;
    
    const location = (isInFocus && (opportunity.locationCity || opportunity.locationState || opportunity.locationCountry) ) ?
      <p className='previewCardText oppLocation'>{opportunity.locationCity} {opportunity.locationState} {opportunity.locationCountry}</p> : null ;
  
    const offerLabel = opportunity.offer ? 'offer to contribute' : 'request for volunteers' ; 
    const opportunityType = isInFocus ? <p className='previewCardText oppType'>Opportunity Type: {offerLabel} / {opportunity.type}</p> : null ;
    
    const link = (isInFocus && opportunity.link) ? <a className='linkIcon' href={opportunity.link} target={'_blank'}>
        <i className="fa fa-globe" aria-hidden="true"></i>
      </a> : null;


    let editOrRespond = <p>Sign in to sign up!</p>; // default if user not logged in
    if(this.props.response){
      editOrRespond = <OpportunityResponse response={this.props.response} opportunity={opportunity}/> ;
    } else if (isMyOpportunity) {
      editOrRespond = <i onClick={()=>this.editOpportunity(opportunity.id)} className="fa fa-pencil editPencil" aria-hidden="true"></i>;
    } else if (this.props.user.id) {
      // this.props.response is passed down from the user profile. in other cases, it is undefined.
      editOrRespond = <OpportunityResponse response={this.props.response} opportunity={opportunity}/> ;
    }
    let listOfResponses = '';
    if(this.props.self && Array.isArray(opportunity.responses)) {
      listOfResponses = opportunity.responses.map((response, index)=>{
        return  <p>{response.id} {response.idOpportunity} {response.userId} {response.notes} {response.responseStatus}
       {response.timestampStatusChange}
        {response.timestampCreated}
        {response.organization}
        {response.firstName}
        {response.lastName}
        {response.title}</p>
      });
    }
    const responses = (isInFocus && this.props.self) ? <div><h6>Responses</h6>{listOfResponses}</div> : '' ;

    return (
      <div className='previewCard'>
        <div className='previewCardInner' onClick={()=>this.focusOpportunity(opportunity.id)}>
        <img className='previewCardLogo' src={logo} alt={`${displayName} logo`}></img>        
          <div className='previewCardTextContainer hoverBlack'>
            <h3 className='previewCardTitle'>{opportunity.title}</h3>
            {displayNameTitle}
            {narrative}
            {location}
            {timeframe}
            {opportunityType}
            {link}
            {requiredSkills}
          </div>
        </div>
        <div className='previewBottomBar'>
          <ul className='causesList'>{causes}</ul>
          {editOrRespond}
        </div>
        {responses}
      </div>
    )
  }
}

export const mapStateToProps = state => ({
  user: state.user,
  display: state.display
});

export default connect(mapStateToProps)(OpportunityPreview);