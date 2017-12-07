import React, { Component } from 'react';
import { connect } from 'react-redux';

export default class DetailedOrganizationPreview extends Component {

  render() {
    return (
      <div>
        <img src="https://www.facebook.com/images/fb_icon_325x325.png"></img>,
        <h3>Facebook</h3>,
        <p>We melt brains, one notification at a time.</p>
      </div>
    )
  }
}