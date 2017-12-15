import React, { Component } from 'react';
import { connect } from 'react-redux';

import './opportunity-preview.css'

export default class OpportunityPreview extends Component {

  render() {
    return (
      <div className='opportunityPreview'>
        <h3 className='opportunityTitle'>{this.props.opportunity.title}</h3>
        <h4 className='requiredSkills'>{this.props.opportunity.requiredSkills}</h4>
        <p className='timeframe'>{this.props.opportunity.requiredSkills}</p>
        <p className='description'>{this.props.opportunity.description}</p>
      </div>
    )
  }
}