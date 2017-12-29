import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Redirect } from 'react-router-dom';
import * as actionsOpportunity from '../../actions/opportunity';
import * as actionsDisplay from '../../actions/display';
import './opportunity-preview.css'
import OpportunityResponse from '../opportunity-response/opportunity-response';

export class OpportunityPreview extends Component {

  editOpportunity(id) {
    console.log('edit opp id', id)
    this.props.dispatch(actionsOpportunity.fetchOpp(id, this.props.user.authToken))
      .then(() => {
        this.props.history.push('/opportunities/create');
        this.props.dispatch(actionsDisplay.changeDisplay('editOpportunity'));
      });
  }


  render() {
    const opportunity = this.props.opportunity;
    const isMyOpportunity = (opportunity.userId === this.props.user.id || this.props.self) ? true : false;
    let editOrRespond = <p>Sign in to sign up!</p>; // default if user not logged in
    let notes = '';
    if(this.props.response){
      editOrRespond = <OpportunityResponse response={this.props.response} opportunity={opportunity}/> ;
    } else if (isMyOpportunity) {
      editOrRespond = <button className='editOpportunityButton' 
      onClick={() => this.editOpportunity(opportunity.id)}>Edit</button> ;
    } else if (this.props.user.id) {
      // this.props.response is passed down from the user profile. in other cases, it is undefined.
      editOrRespond = <OpportunityResponse response={this.props.response} opportunity={opportunity}/> ;
    }


    return (
      <div className='opportunityPreview'>
        <h3 className='opportunityTitle'>{opportunity.title}</h3>
        <h4 className='requiredSkills'>{opportunity.requiredSkills}</h4>
        <p className='timeframe'>{opportunity.timeframe}</p>
        <p className='description'>{opportunity.description}</p>
        {editOrRespond}
      </div>
    )
  }
}

export const mapStateToProps = state => ({
  user: state.user,
  display: state.display
});

export default connect(mapStateToProps)(OpportunityPreview);