import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import DropdownList from 'react-widgets/lib/DropdownList'
import * as actionsUser from '../../actions/user';
import * as actionsDisplay from '../../actions/display';

import './role-preview.css';

export class RolePreview extends Component {

  componentWillMount() {
    let role;
    let capabilities;
    let idRole;
    if(this.props.role){
      role = this.props.role;
      idRole = this.props.role.id;
      capabilities = this.props.role.capabilities || this.props.roleType;
    } else if (this.props.user) {
      role = {
        firstName: this.props.user.firstName,
        lastName: this.props.user.lastName,
        organization: this.props.user.organization,
        logo: this.props.user.logo,
        idUserReceiving: this.props.user.id,
      };
      idRole = `u${this.props.user.id}${this.props.index}`;
      capabilities = this.props.roleType;
    }
    this.setState({
      role,
      capabilities,
      idRole,  // need this to be unique, including potential roles
      buttonLabel: 'edit',
    })
  }

  toggleVisibility(id, userId) {
    this.props.dispatch(actionsDisplay.toggleRole(id, userId));
    this.props.reset();
  }

  goToUser() {
    this.props.dispatch(actionsUser.fetchUser(
      this.state.role.idUserReceiving,
      this.props.userInState.authToken,
      'userViewed'
    ))
  }

  setRole(formValues) {
    // console.log('formValues',formValues);
    const role = {
      id: this.state.role.id,
      idUserAdding: this.props.userInState.id,
      idUserReceiving: this.state.role.idUserReceiving,
      capabilities: formValues.capabilities
    }    
    this.props.dispatch(actionsUser.createOrEditRole(role, this.props.roleType, this.props.userInState.authToken))
    .then(()=>{
      if (!role.id) {
        // if no id, role is new, get id from store (put there by fetch upon create)
        this.setState({capabilities: role.capabilities, id: this.props.display.latestRole})
      } else {
        this.setState({capabilities: role.capabilities})
      }
    })
  }

  render() {

    const isInFocus = this.props.display.idRole === this.state.idRole ? true : false; // using store, so that we only ever have 1 in focus

    const renderDropdownList = ({ input, data, valueField, textField }) =>
    <DropdownList {...input}
      data={data}
      onChange={input.onChange} />

    let selector;
    
    if (this.props.roleType === 'following') {
      const capabilities = this.state.capabilities === 'following' ? 'delete' : 'following' ;
      const buttonLabel = this.state.capabilities === 'following' ? 'un-Follow' : 'Follow' ;
      selector = <button onClick={()=>this.setRole(capabilities)}>{buttonLabel}</button>
    } else if (this.props.roleType === 'admin'  && isInFocus) {
      selector = <form className='selectAdmin'
        onSubmit={this.props.handleSubmit((values) => this.setRole(values))}>
        <div>
          <p>{this.state.role.firstName} {this.state.role.lastName} {this.state.role.organization}</p>
          <label
            className='inputLabel'
            htmlFor='capabilities'>Role
          </label>
          <Field
            name='capabilities'
            id='capabilities'
            component={renderDropdownList}
            data={this.props.general.roleTypes}
            className='inputField' />
        </div>
        <button className='submitButton'
          type="submit" disabled={this.props.submitting}>Save
        </button>
      </form>
    }

    return (
      <div className='rolePreview'>
        <div className='rolePreviewInner' onClick={() => this.goToUser()}>
          <h3 className='name'>{this.state.role.organization} {this.state.role.firstName} {this.state.role.LastName}</h3>
        </div>
        <button 
          className='responseButton' 
          onClick={() => this.toggleVisibility(this.state.idRole, this.state.role.idUserReceiving)}>
          {this.state.buttonLabel}
        </button>
        {selector}
      </div>
    )
  }
}

export const mapStateToProps = state => ({
  userInState: state.user,
  general: state.general,
  display: state.display,
  enableReinitialize: true,
  initialValues: state.user.admins[state.display.roleUserId]
})

export default compose(
  connect(mapStateToProps),
  reduxForm({form: 'rolePreview'})
)(RolePreview);