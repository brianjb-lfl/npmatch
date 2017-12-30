import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionsUser from '../../actions/user';

import './role-preview.css';

export class RolePreview extends Component {
  constructor(props){
    super(props);
    this.state={
      capabilities: this.props.role.capabilities || 'inactive'
    }
  }

  goToUser() {
    this.props.dispatch(actionsUser.fetchUser(
      this.props.role.idUserReceiving,
      this.props.userInState.authToken,
      'userViewed'
    ))
  }

  editRole(capabilities){
    const isNew = this.props.role.id ? false : true ;
    const role = {
      id: this.props.role.id,
      idUserAdding: this.props.userInState.id,
      idUserReceiving: this.props.role.idUserReceiving,
      capabilities,
    }    
    this.props.dispatch(actionsUser.createOrDeleteRole(role, this.props.userInState.authToken, isNew))
    // .then(()=>{
      console.log('REMOVE THIS WHEN SERVER ACCEPTS ROLES')
      this.setState({capabilities})
    // })
  }

  render() {
    return (
      <div className='rolePreview' onClick={() => this.goToUser()}>
        <h3 className='name'>{this.props.role.organization} {this.props.role.firstName} {this.props.role.LastName}</h3>
        <button onClick={()=>this.editRole('delete')}>{this.state.capabilities}</button>
      </div>
    )
  }
}

export const mapStateToProps = state => ({
  userInState: state.user,
})

export default connect(mapStateToProps)(RolePreview);