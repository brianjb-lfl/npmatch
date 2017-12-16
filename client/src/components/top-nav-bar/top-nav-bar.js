import React, { Component } from 'react';
import { connect } from 'react-redux';
import './top-nav-bar.css'
import * as actionsOpportunitiesList from '../../actions/opportunities-list';
import * as actionsDisplay from '../../actions/display';

export class TopNavBar extends Component {

  listOpportunities(query) {
    console.log('list opps query',query)
    this.props.dispatch(actionsOpportunitiesList.fetchOppsList(query,this.props.user.authToken))
    .then(()=> this.props.history.push('/myopportunities'))
  }

  editProfile() {
    this.props.dispatch(actionsDisplay.changeDisplay('editProfile'));
    this.props.history.push(`/profiles/${this.props.user.id}/edit`)
  }

  render() {
    return (
      <div>
        <ul className='topNav'>
          <li className='inboxButton'>
            <i className="fa fa-envelope-o" aria-hidden="true"></i>
          </li>
          <li className='opportunitiesButton'>
            <i className="fa fa-briefcase" aria-hidden="true"
              onClick={() => this.listOpportunities({ userId: this.props.user.id })}></i>
          </li>
          <li className='searchBar'>
            <form className="search">
              <label htmlFor="userinput"></label>
              <input type="text" className="userinput"></input>
              <button type="submit" className="submit-button">
                <i class="fa fa-search" aria-hidden="true"></i>
              </button>
            </form>
          </li>
          <li className='editProfileButton'>
            <i className="fa fa-user-circle-o" aria-hidden="true"
              onClick={()=>this.editProfile()}></i>
          </li>
          <li className='rightTopButton'>
            <i className="fa fa-bars" aria-hidden="true"></i>
          </li>
        </ul>
      </div>
    )
  }
}

export const mapStateToProps = state => ({
  display: state.display.view,
  user: state.user
})
export default connect(mapStateToProps)(TopNavBar);