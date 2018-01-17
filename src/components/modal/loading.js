import React, { Component } from 'react';
import './modal.css';

export default class Loading extends Component {

  render() {

    return (
      <div className='loadingContainer'>
        <div className='loadingBackground'
          onClick={()=>{}}>
        </div>
        <i className='fa fa-spinner loadingIcon' aria-hidden="true"></i>
      </div>
    );
  }
}