import React, { Component } from 'react';
import { connect } from 'react-redux';


export default class BottomNavBar extends Component {

  render() {
    return (
      <div>
        <ul className='bottomNav'>
          <li className='leftButton'>
            <i className="fa fa-envelope-o" aria-hidden="true"></i>
          </li>
          <li className='searchBar'>
            <form className="search">
              <label for="userinput"></label>
              <input type="text" className="userinput"></input>
              <button type="submit" className="submit-button">Search</button>
            </form>
          </li>
          <li className='rightButton'>
            <i className="fa fa-bars" aria-hidden="true"></i>
          </li>
        </ul>
      </div>
    )
  }
}