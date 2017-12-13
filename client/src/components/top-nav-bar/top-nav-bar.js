import React, { Component } from 'react';
import { connect } from 'react-redux';
import './top-nav-bar.css'


export default class TopNavBar extends Component {

  render() {
    return (
      <div>
        <ul className='topNav'>
          <li className='leftTopButton'>
            <i className="fa fa-envelope-o" aria-hidden="true"></i>
          </li>
          <li className='searchBar'>
            <form className="search">
              <label htmlFor="userinput"></label>
              <input type="text" className="userinput"></input>
              <button type="submit" className="submit-button">Search</button>
            </form>
          </li>
          <li className='rightTopButton'>
            <i className="fa fa-bars" aria-hidden="true"></i>
          </li>
        </ul>
      </div>
    )
  }
}