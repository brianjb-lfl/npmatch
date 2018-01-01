import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form';

import './top-nav-bar.css'
import * as actionsOpportunitiesList from '../../actions/opportunities-list';
import * as actionsDisplay from '../../actions/display';

export class TopNavBar extends Component {

  listOpportunities(query) {
    // console.log('list opps query', query)
    this.props.dispatch(actionsOpportunitiesList.fetchOppsList(query, this.props.user.authToken))
      .then(() => this.props.history.push('/myopportunities'))
  }

  queryOpportunities(query) {
    console.log('list opps query', query)
    this.props.dispatch(actionsOpportunitiesList.fetchOppsList(query, this.props.user.authToken))
      .then(() => {
        this.props.history.push('/myopportunities')
        this.props.reset();
      })
  }

  goToProfile() {
    this.props.dispatch(actionsDisplay.setUser(this.props.user.id));
    this.props.dispatch(actionsDisplay.changeDisplay('selfProfile'));
    this.props.history.push(`/profiles/${this.props.user.id}/`)
  }

  render() {
    let topNavButtons;
    if (this.props.user.id) {
      topNavButtons =
        <ul className='topNav'>
          <li className='inboxButton'>
            <i className="fa fa-envelope-o" aria-hidden="true"></i>
          </li>
          <li className='opportunitiesButton'>
            <i className="fa fa-briefcase" aria-hidden="true"
              onClick={() => this.listOpportunities({ userId: this.props.user.id })}></i>
          </li>
          <li className='searchBar'>
            <form className="search" onSubmit={this.props.handleSubmit(values =>this.queryOpportunities(values))}>
              <label htmlFor="userinput"></label>
              <Field
                className="userinput"
                type="text"
                component="input"
                id="userinput"
                name="title"
              />
              <button type="submit" className="submit-button">
                <i className="fa fa-search" aria-hidden="true"></i>
              </button>
            </form>
          </li>
          <li className='editProfileButton'>
            <i className="fa fa-user-circle-o" aria-hidden="true"
              onClick={() => this.goToProfile()}></i>
          </li>
          <li className='settingsButton'>
            <i className="fa fa-bars" aria-hidden="true"></i>
          </li>
        </ul>
    }

    else {
      topNavButtons = <ul className='topNav'>
        <li className='searchBar'>
          <form className="search">
            <label htmlFor="userinput"></label>
            <input type="text" className="userinput"></input>
            <button type="submit" className="submit-button">
              <i className="fa fa-search" aria-hidden="true"></i>
            </button>
          </form>
        </li>
      </ul>
    }
    return (
      <div>
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
)(TopNavBar);