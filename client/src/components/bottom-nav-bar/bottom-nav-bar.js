import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actionsUsersList from '../../actions/users-list';
import * as actionsDisplay from '../../actions/display';

import './bottom-nav-bar.css'

export class BottomNavBar extends Component {
  leftOnClick() {
    if (this.props.display === 'landingPage') {
      this.props.history.push('/login');
      this.props.dispatch(actionsDisplay.changeDisplay('login'));
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
    if (this.props.display === 'landingPage') {
      this.props.history.push('/register');
      this.props.dispatch(actionsDisplay.changeDisplay('register'));
    }
    else {
      this.props.dispatch(actionsUsersList.fetchUsersList(
        {},
        this.props.user.authToken,
        'users'
      ));
      this.props.dispatch(actionsDisplay.changeDisplay('exploreContributors'));
      this.props.history.push('/contributors');
    }
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
    console.log(this.props.match);
    if (this.props.match.url !== '/') {
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
  user: state.user,
  display: state.display.view
})
export default connect(mapStateToProps)(BottomNavBar);