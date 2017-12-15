import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionsOpportunity from '../../actions/opportunity';

export class OpportunityPreview extends Component {

  editOpportunity(id) {
    this.props.dispatch(actionsOpportunity.fetchOpp(id, this.props.user.authToken))
      .then(() => this.props.history.push('/opportunities/create'))
  }

  render() {
    return (
      <div>
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