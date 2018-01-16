import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionsDisplay from '../../actions/display';
import './modal.css';

export class Modal extends Component {

  exit() {
    this.props.dispatch(actionsDisplay.toggleModal(null));
  }

  render() {
    const message = this.props.display.modalMessage ? this.props.display.modalMessage : 'Sorry... something went wrong...' ;

    return (
      <div className='modalContainer'>
        <div className='modalBackground'
          onClick={()=>{}}>
        </div>
        <div className='modalPanel'>
          <p className='modalMessage'>
            {message}
          </p>
          <i className="fa fa-times-circle modalExitButton" aria-hidden="true"
            onClick={()=>this.exit()}></i>
        </div>
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  display: state.display
});

export default connect(mapStateToProps)(Modal);