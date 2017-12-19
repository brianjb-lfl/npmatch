import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import * as actionsUser from '../../actions/user';
// import * as actionsOpportunity from '../../actions/opportunity';
import OpportunityPreview from '../opportunity-preview/opportunity-preview';

import './opportunities-page.css';

export class OpportunitiesPage extends Component {

  render() {
    console.log('this.props.opportunitiesList.main',this.props.opportunitiesList.main)
    const listOfOpps = this.props.opportunitiesList.main.map((opp,index)=>{
      return <li key={index}><OpportunityPreview opportunity={opp} history={this.props.history} index={index}/></li>
    });

    return (
      <main className='opportunitiesPage'>
        <h2>Opportunities</h2>
        <Link to='/opportunities/create' className='link'>
          <div>
            <button className='addOpportunity'>Add Opportunity</button>
          </div>
        </Link>

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