import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Redirect } from 'react-router-dom';
import * as actionsOpportunity from '../../actions/opportunity';
import * as actionsDisplay from '../../actions/display';
import OpportunityResponse from '../opportunity-response/opportunity-response';

export class OpportunityPreview extends Component {
  // props from parent: self(boolean for in context of user viewing own opportunities), response, opportunity, history

  editOpportunity(id) {
    this.props.dispatch(actionsOpportunity.fetchOpp(id, this.props.user.authToken))
      .then(() => {
        this.props.history.push('/opportunities/create');
        // this.props.dispatch(actionsDisplay.changeDisplay('editOpportunity'));
        window.scrollTo(0,0);
      });
  }

  focusOpportunity(id) {
    this.props.dispatch(actionsOpportunity.fetchOpp(id, this.props.user.authToken))
      .then(() => {
        this.props.dispatch(actionsDisplay.toggleOpportunity(id));
      });
  }

  render() {
    const opportunity = this.props.opportunity;
    const displayName = this.props.opportunity.organization ? this.props.opportunity.organization : `${this.props.opportunity.firstName} ${this.props.opportunity.lastName}`;
    
    const causes = Array.isArray(opportunity.causes) ? opportunity.causes.map((cause, index)=>{
      return <li key={index} className='causeIcon'>{cause}</li>
    }) : '' ;
    const isInFocus = this.props.display.idOpportunity === opportunity.id ? true : false ;
    const isMyOpportunity = (opportunity.userId === this.props.user.id || this.props.self) ? true : false;
    
    const displayNameTitle = isMyOpportunity ? null : <h3 className='previewCardTitle'>{displayName}</h3>
    
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

    const requiredSkills = opportunity.requiredSkills ? <h4 className='requiredSkills'>{opportunity.requiredSkills}</h4> : null ;
    const timeframe = opportunity.timeframe ? <p className='timeframe'>{opportunity.timeframe}</p> : null ;
    const description = opportunity.description ? <p className='description'>{opportunity.description}</p> : null ;

    const logo = opportunity.logo ? opportunity.logo : 'https://mave.me/img/projects/full_placeholder.png' ;

    return (
      <div className='previewCard'>
        <div className='previewCardInner' onClick={()=>this.focusOpportunity(opportunity.id)}>
        <img className='previewCardLogo' src={logo} alt={`${displayName} logo`}></img>        
          <div className='previewCardTextContainer hoverBlack'>
            <h3 className='previewCardTitle'>{opportunity.title}</h3>
            {displayNameTitle}
            {requiredSkills}
            {timeframe}
            {description}
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