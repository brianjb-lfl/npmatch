import React, { Component } from 'react';
import { connect } from 'react-redux';
import './response.css';
import * as actionsDisplay from '../../actions/display';
import * as helpers from '../../actions/helpers';

export class Acceptance extends Component {

  render() {

    const response = this.props.response;
    const displayName = helpers.formatUserName(response);

    const other = <div>
        {response.id} 
        {response.idOpportunity} 
        {response.userId}
      </div>;

    return ( <tr>
      <td>{displayName}</td>
      <td>{response.notes}</td>
      <td className='tooltip'>{response.responseStatus}
        <div className='popover popoverWide3'>
          <p>{displayName} responded on {helpers.printDateAsString(helpers.convertStringToTimeStamp(response.timestampCreated))}</p>
          <br/>
          <p>last changed on {helpers.printDateAsString(helpers.convertStringToTimeStamp(response.timestampStatusChange))}</p>
        </div>
      </td>
      <td>...action</td>
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

export default connect(mapStateToProps)(Acceptance);
