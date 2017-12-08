import React, { Component } from 'react';
import { connect } from 'react-redux';

export default class BottomNavBar extends Component {

  render() {
    return (
      <div>
        <ul className='bottomNav'>
          <li className='leftButton'></li>
          <li className='rightButton'></li>
        </ul>
      </div>
    )
  }
}