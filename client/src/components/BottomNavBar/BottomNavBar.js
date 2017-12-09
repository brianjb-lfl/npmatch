import React, { Component } from 'react';
import { connect } from 'react-redux';

export default class BottomNavBar extends Component {

  render() {
    return (
      <div>
        <ul className='bottomNav'>
          <li className='leftButton'>
            <a href={this.props.leftLink} alt={this.props.leftAltText}>
              {this.props.leftLabel}
            </a>
          </li>
          <li className='rightButton'>
            <a href={this.props.rightLink} alt={this.props.rightAltText}>
              {this.props.rightLabel}
            </a>
          </li>
        </ul>
      </div>
    )
  }
}