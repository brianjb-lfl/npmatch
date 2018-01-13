import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form';

import './nav-bar-top.css'
import * as actionsOpportunitiesList from '../../actions/opportunities-list';
import * as actionsDisplay from '../../actions/display';

export class NavBarTop extends Component {

  listOpportunities(query) {
    // console.log('list opps query', query)
    this.props.dispatch(actionsOpportunitiesList.fetchOppsList(query, this.props.user.authToken))
      .then(() => {
        this.props.history.push('/myopportunities');
        window.scrollTo(0,0);
      })
  }

  queryOpportunities(query) {
    console.log('list opps query', query)
    this.props.dispatch(actionsOpportunitiesList.fetchOppsList(query, this.props.user.authToken))
      .then(() => {
        this.props.history.push('/myopportunities');
        this.props.reset();
        window.scrollTo(0,0);
      })
  }

  goToProfile() {
    this.props.dispatch(actionsDisplay.setUser(this.props.user.id));
    this.props.dispatch(actionsDisplay.changeDisplay('selfProfile'));
    this.props.history.push(`/profiles/${this.props.user.id}/`);
    window.scrollTo(0,0);
  }

  render() {
    let topNavButtons;

    const searchBarForm = <li className='searchBar'>
      <form className="searchBarForm" onSubmit={this.props.handleSubmit(values =>this.queryOpportunities(values))}>
        <label htmlFor="userInput"></label>
        <Field
          className="userInput"
          type="text"
          component="input"
          id="userInput"
          name="title"
        />
        <button type="submit" className="searchBarSubmitButton">
          <i className="fa fa-search" aria-hidden="true"></i>
        </button>
      </form>
    </li>

    if (this.props.user.id) {
      topNavButtons =
        <ul className='topNavUl navUl'>
          <li className='inboxButton navBarButton'>
            <i className="fa fa-envelope-o" aria-hidden="true"></i>
          </li>
          <li className='opportunitiesButton navBarButton'>
            <i className="fa fa-briefcase" aria-hidden="true"
              onClick={() => this.listOpportunities({ userId: this.props.user.id })}></i>
          </li>
          {searchBarForm}
          <li className='editProfileButton navBarButton'>
            <i className="fa fa-user-circle-o" aria-hidden="true"
              onClick={() => this.goToProfile()}></i>
          </li>
          <li className='settingsButton bars navBarButton'>
            <i className="fa fa-bars" aria-hidden="true"></i>
          </li>
          <li className='settingsButton cog navBarButton'>
            <i className="fa fa-cog" aria-hidden="true"></i>
          </li>
        </ul>
    }

    else {
      topNavButtons = <ul className='topNavUl navUl'>
        {searchBarForm}
      </ul>
    }
    return (
      <div className='topNavContainer navContainer'>
        {topNavButtons}
      </div>
    )
  }
}

export const mapStateToProps = state => ({
  display: state.display,
  user: state.user
})
export default compose(
  connect(mapStateToProps),
  reduxForm({form:'searchOpps'}),
)(NavBarTop);