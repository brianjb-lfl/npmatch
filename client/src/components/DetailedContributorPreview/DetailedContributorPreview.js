import React, { Component } from 'react';
import { connect } from 'react-redux';

export class DetailedContributorPreview extends Component {

  render() {
    return (
      <div>
        <img className='logo' src={this.props.logo}></img>
        <h3 className='name'>{this.props.name}</h3>
        <p className='description'>{this.props.description}</p>
        <p className='causes'>{this.props.causes}</p>
        <p className='skills'>{this.props.skills}</p>
        <p className='availability'>{this.props.availability}</p>
      </div>
    )
  }
}

export default connect()(DetailedContributorPreview)