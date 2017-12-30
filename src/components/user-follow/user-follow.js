import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import * as actionsUser from '../../actions/user';
import * as actionsDisplay from '../../actions/display';

export class UserFollow extends Component {
  // Props from parent: id is id of user to be followed

  toggleFollow(capabilities) {
    let id = null;
    let isNew = true;
    if(this.props.user.following){ // user who is logged in
      if(this.props.user.following[this.props.id]) { // this.props.id is user to be followed
        id = this.props.user.following[this.props.id].id; // id of the roles join table
        isNew = false;
      }
    }
    const role = {
      id,
      idUserAdding: this.props.user.id,
      idUserReceiving: this.props.id,
      capabilities,
    };
    this.props.dispatch(actionsUser.createOrDeleteRole(role, this.props.user.authToken, isNew));
  }

  render() {
    let isFollowing = false;
    if(this.props.user.following){
      if(this.props.user.following[this.props.id] && this.props.user.following[this.props.id].capabilities !== 'delete') {
        isFollowing = true;
      }
    }
    const buttonLabel  = isFollowing ? 'un-Follow' : 'Follow' ;
    const capabilities = isFollowing ? 'delete' : 'following' ; // capabilities to use on change

    return (
      <div>
        <button 
          className='followButton' 
          onClick={() => this.toggleFollow(capabilities)}>
          {buttonLabel}
        </button>
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  user: state.user,
  display: state.display,
})

export default connect(mapStateToProps)(UserFollow);
