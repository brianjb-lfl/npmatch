import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import * as actionsUser from '../../actions/user';
import * as actionsOpportunity from '../../actions/opportunity';
import OpportunityPreview from '../opportunity-preview/opportunity-preview';

import './opportunities-page.css';

export class OpportunitiesPage extends Component {

  createOpportunity(){
    this.props.dispatch(actionsOpportunity.loadOpportunity({}));
    this.props.history.push('/opportunities/create');
  }

  render() {
    // console.log('this.props.opportunitiesList.main',this.props.opportunitiesList.main)
    const listOfOpps = this.props.opportunitiesList.main.map((opp,index)=>{
      return <li key={index}><OpportunityPreview opportunity={opp} history={this.props.history} index={index}/></li>
    });

    return (
      <main className='opportunitiesPage'>
        <h2>Opportunities</h2>
        <button className='addOpportunity' onClick={()=>this.createOpportunity()}>Add Opportunity</button>

        <ul>
          {listOfOpps}
        </ul>
      
      </main>
    );
  }
}

export const mapStateToProps = state => ({
  user: state.user,
  opportunitiesList: state.opportunitiesList,
  display: state.display.view
});

export default connect(mapStateToProps)(OpportunitiesPage);