import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import './response.css';
import * as actionsUser from '../../actions/user';
import * as actionsDisplay from '../../actions/display';

export class Acceptance extends Component {

  render() {

    const response = this.props.response;
    const acceptanceBody = <p className='acceptanceBody'>
        {response.id} 
        {response.idOpportunity} 
        {response.userId} 
        {response.notes} 
        {response.responseStatus}
        {response.timestampStatusChange}
        {response.timestampCreated}
        {response.organization}
        {response.firstName}
        {response.lastName}
        {response.title}</p>;

    return (
      <div className='acceptanceContainer'>
        {acceptanceBody}
      </div>
    );
  }
}

export const mapStateToProps = state => {
  return {
    user: state.user,
    display: state.display,
    enableReinitialize: true,
  }
}

export default compose(
  connect(mapStateToProps),
  reduxForm({ form: 'acceptance' })
)(Acceptance);
