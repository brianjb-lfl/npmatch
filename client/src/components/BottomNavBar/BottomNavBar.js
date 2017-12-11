import React, { Component } from 'react';
import { connect } from 'react-redux';

import './BottomNavBar.css'

export default class BottomNavBar extends Component {

  render() {
    return (
      <div>
        <ul className='bottomNav'>
          <li className='leftBottomButton'>
            <a href={this.props.leftLink} alt={this.props.leftAltText}>
              {this.props.leftLabel}
            </a>
          </li>
          <li className='rightBottomButton'>
            <a href={this.props.rightLink} alt={this.props.rightAltText}>
              {this.props.rightLabel}
            </a>
          </li>
        </ul>
      </div>
    )
  }
}