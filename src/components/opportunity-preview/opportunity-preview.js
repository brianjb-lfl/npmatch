import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionsOpportunity from '../../actions/opportunity';
import * as actionsDisplay from '../../actions/display';
import * as helpers from '../../actions/helpers';
import Response from '../response/response';
import Acceptance from '../response/acceptance';

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
    const logo = opportunity.logo ? opportunity.logo : 'https://mave.me/img/projects/full_placeholder.png' ;

    const causes = helpers.formatCausesIcon(opportunity.causes, opportunity);

    const isInFocus = this.props.display.idOpportunity === opportunity.id ? true : false ;
    const isMyOpportunity = (opportunity.userId === this.props.user.id || this.props.self) ? true : false;
    
    const displayNameTitle = isMyOpportunity ? <h3 className='previewCardTitle'>This is my event!</h3> : <h3 className='previewCardTitle'>{this.props.opportunity.organization}</h3>
    
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
    
    const formattedTimeframe = isInFocus ? helpers.formatTimeframe(opportunity) : null ;
    const timeframe = formattedTimeframe ? <p className='previewCardText oppTimeframe'>{formattedTimeframe}</p> : null ;
    
    const formattedLocation = helpers.formattedLocation(opportunity);
    const location = (isInFocus && formattedLocation ) ?
      <div className='previewCardText oppLocation'>{formattedLocation}</div> : null ;
    const link = isInFocus ? helpers.formatLinksIcon(opportunity.link) : null ;
    let locationAndLink = null;
    if (location && link) {
      locationAndLink = <div className='locationAndLink'>{location}{link}</div>
    } else if (location) {
      locationAndLink = location;
    } else if (link) {
      locationAndLink = <div className='locationAndLink'><div></div>{link}</div> ;
    }

    const offerLabel = opportunity.offer ? 'offer to contribute' : 'request for volunteers' ; 
    const opportunityType = isInFocus ? <p className='previewCardText oppType'>Opportunity Type: {offerLabel} / {opportunity.type}</p> : null ;
    

    let editOrRespond = <p>Sign in to sign up!</p>; // default if user not logged in
    if(this.props.response){
      editOrRespond = <Response response={this.props.response} opportunity={opportunity}/> ;
    } else if (isMyOpportunity) {
      editOrRespond = <i onClick={()=>this.editOpportunity(opportunity.id)} 
        className='fa fa-pencil editPencil' aria-hidden='true'>
          <div className='popover'>edit</div>
        </i>;
    } else if (this.props.user.id) {
      // this.props.response is passed down from the user profile. in other cases, it is undefined.
      editOrRespond = <Response response={this.props.response} opportunity={opportunity}/> ;
    }
    let listOfResponses;
    if (this.props.self && Array.isArray(opportunity.responses)) {
      if (opportunity.responses.length > 0) {
        listOfResponses = opportunity.responses.map((response, index)=> <Acceptance key={index} response={response}/>);
      }
    }
    const responses = (isInFocus && this.props.self) ? <div className='acceptanceContainer'>
      <h6>Responses</h6>
      <table className='acceptanceTable'>
        <tbody>{listOfResponses}</tbody>
      </table>
    </div> : <p>No-one has responded yet</p> ;

    const overflowClass = isInFocus ? '' : 'overflowHidden';

    return (
      <div className='previewCard'>
        <div className={`previewCardInner ${overflowClass}`} onClick={()=>this.focusOpportunity(opportunity.id)}>
        <img className='previewCardLogo' src={logo} alt={`${this.props.opportunity.organization} logo`}></img>        
          <div className='previewCardTextContainer hoverBlack'>
            <h3 className='previewCardTitle'>{opportunity.title}</h3>
            {displayNameTitle}
            {narrative}
          </div>
        </div>
        <div className='previewCardInner' onClick={()=>this.focusOpportunity(opportunity.id)}>
          <div className='previewCardTextContainer hoverBlack'>
            {locationAndLink}
            {timeframe}
            {opportunityType}
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