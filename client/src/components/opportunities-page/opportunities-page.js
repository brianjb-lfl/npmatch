import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { display } from '../../reducers/potential-states';
import * as actionsUser from '../../actions/user';
import * as actionsOpportunity from '../../actions/opportunity';
import OpportunityPreview from '../opportunity-preview/opportunity-preview';

export class OpportunitiesPage extends Component {

  render() {

    const listOfOpps = this.props.opportunitiesList.main.map((opp,index)=>{
      <li><OpportunityPreview opportunity={opp} key={index}/></li>
    })

    return (
      <main>
        <Link to='/opportunities/create'>
          <div>
            <button>Add Opportunity</button>
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