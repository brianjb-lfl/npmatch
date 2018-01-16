import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import './response.css';
import * as actionsUser from '../../actions/user';
import * as actionsDisplay from '../../actions/display';
import * as helpers from '../../actions/helpers';

export class Acceptance extends Component {

  render() {

    const response = this.props.response;
    const displayName = helpers.formatUserName(response);

    const other = <div>
        last change {helpers.printDateAsString(helpers.convertStringToTimeStamp(response.timestampStatusChange))}
        responded {helpers.printDateAsString(helpers.convertStringToTimeStamp(response.timestampCreated))}
        {response.id} 
        {response.idOpportunity} 
        {response.userId}
      </div>;

    return ( <tr>
      <td>{displayName}</td>
      <td>{response.notes}</td>
      <td>{response.responseStatus}</td>
    </tr> );
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
