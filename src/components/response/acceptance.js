import React, { Component } from 'react';
import { connect } from 'react-redux';
import './response.css';
import * as actionsDisplay from '../../actions/display';
import * as helpers from '../../actions/helpers';

export class Acceptance extends Component {

  toggleFocus(id) {
    console.log(id)
    this.props.dispatch(actionsDisplay.toggleResponse(id))
  }

  render() {

    const response = this.props.response;
    const isInFocus = this.props.display.idResponse == response.id ? true : false ;
    const displayName = helpers.formatUserName(response);

    const hoverPopover = isInFocus ? null :
      <div className='popover popoverWide3'>
        <p>Click to edit.</p>
        <br/>
        <p>{displayName} responded on {helpers.printDateAsString(helpers.convertStringToTimeStamp(response.timestampCreated))}</p>
        <br/>
        <p>last changed on {helpers.printDateAsString(helpers.convertStringToTimeStamp(response.timestampStatusChange))}</p>
      </div>

    const acceptancePopover = isInFocus ? 
      <div className='acceptanceForm'>
        <p>acceptanceForm</p>
        <i className="fa fa-times-circle modalExitButton" aria-hidden="true"
            onClick={()=>this.toggleFocus(response.id)}></i>
      </div> : null ;

    return ( <tr>
      <td>{displayName}</td>
      <td>{response.notes}</td>
      <td className='tooltip'>
        <div className='responseStatusTableCell tooltip' onClick={()=>this.toggleFocus(response.id)}>
          {response.responseStatus}
          {hoverPopover}
        </div>
        {acceptancePopover}
      </td>
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
