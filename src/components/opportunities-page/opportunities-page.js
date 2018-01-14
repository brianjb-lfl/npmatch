import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Redirect } from 'react-router-dom';
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

    const redirect = this.props.user.id ? '' :
    <Switch><Redirect from='*' to='/' /></Switch>

    const listOfOpps = this.props.opportunitiesList.main.map((opp,index)=>{
      return <OpportunityPreview response={this.props.user.responses[opp.id]} key={index} opportunity={opp} history={this.props.history} index={index}/>
    });

    const createOppButton = this.props.user.id ? 
      <button className='addOpportunityButton' onClick={()=>this.createOpportunity()}>Add Opportunity</button> : '' ;

    return (
      <main>
        {redirect}
        <h2>Opportunities</h2>
        {createOppButton}
        <div className='previewCardListContainer'>
          {listOfOpps}
        </div>
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