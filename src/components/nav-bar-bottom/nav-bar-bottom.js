import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionsUsersList from '../../actions/users-list';
import * as actionsDisplay from '../../actions/display';
import './nav-bar-bottom.css'

export class NavBarBottom extends Component {
  clickLeftButton() {
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
      window.scrollTo(0,0);
    }
  }

  clickRightButton() {
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
      window.scrollTo(0,0);
    }
  }

  homeButton() {
    this.props.history.push('/');
    window.scrollTo(0,0);
  }

  render() {
    let leftButton;
    const leftLabel  = this.props.display === 'landingPage' ? 'Sign In' : 'Organizations' ;
    let rightButton;
    const rightLabel = this.props.display === 'landingPage' ? 'Sign Up' : 'Contributors' ;
    const homeButton = (this.props.match.url !== '/') ?
      <li onClick={()=>this.homeButton()} className='homeBottomButton'>
        <button className='navBarButton'>Home</button>
      </li> : null ;

    if (this.props.match.url !== '/login' && this.props.match.url !== '/register') {
      leftButton = <li className='leftBottomButton' onClick={() => this.clickLeftButton()}>
        <button className='navBarButton'>
        {leftLabel}
        </button>
      </li>
      rightButton = <li className='rightBottomButton' onClick={() => this.clickRightButton()}>
        <button className='navBarButton'>
          {rightLabel}
        </button>
      </li>
    }

    return (
      <div className='bottomNavContainer navContainer'>
        <ul className='bottomNavUl navUl'>
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
export default connect(mapStateToProps)(NavBarBottom);