import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actionsUsersList from '../../actions/usersList';
import * as actionsDisplay from '../../actions/display';

import './BottomNavBar.css'

export class BottomNavBar extends Component {
  exploreOrganizations() {
    this.props.dispatch(actionsUsersList.fetchUsersList(
      {},
      this.props.user.authToken,
      'orgs'
    ))
    .then(() => this.props.dispatch(actionsDisplay.changeDisplay('exploreOrganizations')))
    .then(() => this.props.history.push('/organizations'))
  }

  exploreContributors() {
    this.props.dispatch(actionsUsersList.fetchUsersList(
      {},
      this.props.user.authToken,
      'users'
    ))
    .then(() => this.props.dispatch(actionsDisplay.changeDisplay('exploreContributors')))
    .then(() => this.props.history.push('/contributors'))
  }
  
  render() {
    let leftButton;
    let leftLabel;
    let rightButton;
    let rightLabel;
    let homeButton;
    if (this.props.display !== 'landingPage' && this.props.display !== 'homePage') {
      homeButton = <Link to='/'>
        <li className='homeBottomButton'>
          <button>
            Home
        </button>
        </li>
      </Link>
    }

    if (this.props.display === 'landingPage') {
      leftButton = '/signInPage'
      leftLabel = 'Sign In'
      rightButton = '/registerPage'
      rightLabel = 'Sign Up'
    }
    else {
      leftButton = '/organizations'
      leftLabel = 'Organizations'
      rightButton = '/contributors'
      rightLabel = 'Contributors'
    }

    return (
      <div>
        <ul className='bottomNav'>
          {homeButton}
          <li className='leftBottomButton' onclick={() => this.exploreOrganizations()}>
            <button>
              {leftLabel}
            </button>
          </li>
          <li className='rightBottomButton' onclick={() => this.exploreContributors()}>
            <button>
              {rightLabel}
            </button>
          </li>
        </ul>
      </div>
    )
  }
}

export const mapStateToProps = state => ({
  display: state.display.view
})
export default connect(mapStateToProps)(BottomNavBar);