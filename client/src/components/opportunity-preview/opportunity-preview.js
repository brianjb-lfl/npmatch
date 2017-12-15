import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actionsOpportunity from '../../actions/opportunity';
import * as actionsDisplay from '../../actions/display';
import './opportunity-preview.css'

export class OpportunityPreview extends Component {

  editOpportunity(id) {
    this.props.dispatch(actionsOpportunity.fetchOpp(id, this.props.user.authToken))
      .then(() => {
        this.props.history.push('/opportunities/create');
        this.props.dispatch(actionsDisplay.changeDisplay('editOpportunity'));
      })
  }

  render() {
    return (
      <div className='opportunityPreview'>
        <h3 className='opportunityTitle'>{this.props.opportunity.title}</h3>
        <h4 className='requiredSkills'>{this.props.opportunity.requiredSkills}</h4>
        <p className='timeframe'>{this.props.opportunity.requiredSkills}</p>
        <p className='description'>{this.props.opportunity.description}</p>
        <button onClick={()=>this.editOpportunity(this.props.opportunity.id)}>Edit</button>
      </div>
    )
  }
}

export const mapStateToProps = state => ({
  user: state.user,
  display: state.display.view
});

export default connect(mapStateToProps)(OpportunityPreview);