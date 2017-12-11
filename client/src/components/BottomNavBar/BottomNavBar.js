import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './BottomNavBar.css'

export default class BottomNavBar extends Component {

  render() {
    return (
      <div>
        <ul className='bottomNav'>
          <Link to='/organizations'>
            <li className='leftBottomButton'>
              <button>
                {this.props.leftLabel}
              </button>
            </li>
          </Link>
          <Link to='/contributors'>
            <li className='rightBottomButton'>
              <button>
                {this.props.rightLabel}
              </button>
            </li>
          </Link>
        </ul>
      </div>
    )
  }
}