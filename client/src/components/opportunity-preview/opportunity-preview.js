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
    return (
      <div className='opportunityPreview'>
        <h3 className='opportunityTitle'>{opportunity.title}</h3>
        <h4 className='requiredSkills'>{opportunity.requiredSkills}</h4>
        <p className='timeframe'>{opportunity.timeframe}</p>
        <p className='description'>{opportunity.description}</p>
        <button onClick={() => this.editOpportunity(opportunity.id)}>Edit</button>
        <OpportunityResponse opportunity={opportunity} />
      </div>
    )
  }
}

export const mapStateToProps = state => ({
  user: state.user,
  display: state.display
});

export default connect(mapStateToProps)(OpportunityPreview);