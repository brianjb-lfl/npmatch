import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Redirect } from 'react-router-dom';
import * as actionsOpportunity from '../../actions/opportunity';
import * as actionsDisplay from '../../actions/display';
import './opportunity-preview.css'
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
    const causes = Array.isArray(opportunity.causes) ? opportunity.causes.map((cause, index)=>{
      return <li key={index} className='causeIcon'>{cause}</li>
    }) : '' ;
    const isInFocus = this.props.display.idOpportunity === opportunity.id ? true : false ;
    const isMyOpportunity = (opportunity.userId === this.props.user.id || this.props.self) ? true : false;
    let editOrRespond = <p>Sign in to sign up!</p>; // default if user not logged in
    if(this.props.response){
      editOrRespond = <OpportunityResponse response={this.props.response} opportunity={opportunity}/> ;
    } else if (isMyOpportunity) {
      editOrRespond = <button className='editOpportunityButton' 
      onClick={() => this.editOpportunity(opportunity.id)}>Edit</button> ;
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
      <div className='opportunityPreview'>
        <div className='opportunityPreviewInner' onClick={()=>this.focusOpportunity(opportunity.id)}>
          <h3 className='opportunityTitle'>{opportunity.title}</h3>
          <h4 className='requiredSkills'>{opportunity.requiredSkills}</h4>
          <p className='timeframe'>{opportunity.timeframe}</p>
          <p className='description'>{opportunity.description}</p>
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