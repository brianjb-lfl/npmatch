import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './BottomNavBar.css'

export class BottomNavBar extends Component {
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
          <Link to={leftButton}>
            <li className='leftBottomButton'>
              <button>
                {leftLabel}
              </button>
            </li>
          </Link>
          <Link to={rightButton}>
            <li className='rightBottomButton'>
              <button>
                {rightLabel}
              </button>
            </li>
          </Link>
        </ul>
      </div>
    )
  }
}

export const mapStateToProps = state => ({
  display: state.display.view
})
export default connect(mapStateToProps)(BottomNavBar);