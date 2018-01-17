import React, { Component } from 'react';
import { connect } from 'react-redux';
import './response.css';
import * as actionsDisplay from '../../actions/display';
import * as helpers from '../../actions/helpers';

export class Acceptance extends Component {
  constructor(props){
    super(props);
    this.state={
      focus: false
    }
  }

  toggleFocus() {
    this.setState({focus: !this.state.focus})
  }

  render() {

    const response = this.props.response;
    const displayName = helpers.formatUserName(response);

    const other = <div>
        {response.id} 
        {response.idOpportunity} 
        {response.userId}
      </div>;

    const hoverPopover = this.state.focus ? null :
      <div className='popover popoverWide3'>
        <p>Click to edit.</p>
        <br/>
        <p>{displayName} responded on {helpers.printDateAsString(helpers.convertStringToTimeStamp(response.timestampCreated))}</p>
        <br/>
        <p>last changed on {helpers.printDateAsString(helpers.convertStringToTimeStamp(response.timestampStatusChange))}</p>
      </div>

    const acceptancePopover = this.state.focus ? 
      <div className='acceptanceForm'>
        <p>acceptanceForm</p>
        <i className="fa fa-times-circle modalExitButton" aria-hidden="true"
            onClick={()=>this.toggleFocus()}></i>
      </div> : null ;

    return ( <tr>
      <td>{displayName}</td>
      <td>{response.notes}</td>
      <td className='tooltip' onClick={()=>this.toggleFocus()}>{response.responseStatus}
        {hoverPopover}
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
