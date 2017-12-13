import React, { Component } from 'react';
import { connect } from 'react-redux';
import './top-nav-bar.css'


export class TopNavBar extends Component {

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

export const mapStateToProps = state => ({
  display: state.display.view,
  user: state.user
})
export default connect(mapStateToProps)(TopNavBar);