import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actionsUsersList from '../../actions/users-list';
import * as actionsDisplay from '../../actions/display';

import './bottom-nav-bar.css'

export class BottomNavBar extends Component {
  signIn() {
    console.log(this.props);
    this.props.dispatch(actionsDisplay.changeDisplay('login'))
      .then(() => this.props.history.push('/login'))
  }

  signUp() {
    this.props.dispatch(actionsDisplay.changeDisplay('register'))
      .then(() => this.props.history.push('/register'))
  }

  exploreOrganizations() {
    console.log('this is firing');
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
      // .then(() => this.props.dispatch(actionsDisplay.changeDisplay('exploreContributors')))
      .then(() => {
        console.log('HERE IS THE HISTORY', this.props.history)
        return this.props.history.push('/contributors')
      })
  }

  leftOnClick() {
    if (this.props.display === 'landingPage') {
      this.props.dispatch(actionsDisplay.changeDisplay('login'));
      this.props.history.push('/login');
    }
    else {
      this.props.dispatch(actionsUsersList.fetchUsersList(
        {},
        this.props.user.authToken,
        'orgs'
      ));
      this.props.dispatch(actionsDisplay.changeDisplay('exploreOrganizations'));
      this.props.history.push('/organizations');
    }
  }

  rightOnClick() {
    
  }

  render() {
    console.log(this.props);
    let leftButton;
    let leftLabel;
    let leftOnClick;
    let rightButton;
    let rightLabel;
    let rightOnClick;
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
      leftOnClick = this.signIn
      rightButton = '/registerPage'
      rightLabel = 'Sign Up'
      rightOnClick = this.signUp

    }
    else {
      leftButton = '/organizations'
      leftLabel = 'Organizations'
      leftOnClick - this.exploreOrganizations
      rightButton = '/contributors'
      rightLabel = 'Contributors'
      rightOnClick = this.exploreContributors
    }

    return (
      <div>
        <ul className='bottomNav'>
          {homeButton}
          <li className='leftBottomButton' onClick={() => this.leftOnClick()}>
            <button>
              {leftLabel}
            </button>
          </li>
          <li className='rightBottomButton' onClick={() => this.rightOnClick()}>
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