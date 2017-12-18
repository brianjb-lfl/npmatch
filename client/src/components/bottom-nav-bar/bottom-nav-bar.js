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
      ));
      this.props.dispatch(actionsDisplay.changeDisplay('exploreContributors'));
      this.props.history.push('/contributors');
    }
  }

  render() {
    let leftButton;
    let leftLabel;
    let rightButton;
    let rightLabel;
    let homeButton;
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
      leftLabel = 'Sign In'
      rightLabel = 'Sign Up'

    }
    else {
      leftLabel = 'Organizations'
      rightLabel = 'Contributors'
    }

    if (this.props.match.url !== '/login' && this.props.match.url !== '/register') {
      leftButton = <li className='leftBottomButton' onClick={() => this.leftOnClick()}>
        <button>
          {leftLabel}
        </button>
      </li>
      rightButton = <li className='rightBottomButton' onClick={() => this.rightOnClick()}>
        <button>
          {rightLabel}
        </button>
      </li>
    }

    return (
      <div>
        <ul className='bottomNav'>
          {homeButton}
          {leftButton}
          {rightButton}
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