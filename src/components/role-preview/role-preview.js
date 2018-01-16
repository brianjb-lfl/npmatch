import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import DropdownList from 'react-widgets/lib/DropdownList'
import * as actionsUser from '../../actions/user';
import * as actionsDisplay from '../../actions/display';
import * as helpers from '../../actions/helpers';

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
        idUserAdding: this.props.userInState.id,
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
      adminButtonLabel: this.props.roleType === 'adminOf' ? 'use site as' : 'edit',
      roleMessage: '',
    })
  }

  selectRole(id, userId) {
    if (this.props.roleType === 'adminOf') {
      alert('coming soon!')
    } else {
      this.props.dispatch(actionsDisplay.toggleRole(id, userId));
      this.props.reset();
    }
  }

  goToUser() {
    this.props.dispatch(actionsUser.fetchUser(
      this.state.role.idUserReceiving,
      this.props.userInState.authToken,
      'userViewed',
      'userViewed'
    ))
    .then(()=>{
      this.props.history.push(`/profiles/${this.state.role.idUserReceiving}`)
      window.scrollTo(0,0);
    })
  }

  setRole(formValues) {
    const role = {
      id: this.state.role.id,
      idUserAdding: this.props.userInState.id,
      idUserReceiving: this.state.role.idUserReceiving,
      capabilities: this.props.roleType === 'following' ? formValues : formValues.capabilities,
    }
    const nameFields = {
      firstName: this.state.role.firstName,
      lastName: this.state.role.lastName,
      organization: this.state.role.organization,
    }
    const roleMessage = (this.props.roleType === 'admin' && formValues.capabilities === 'delete') ? 'admin role has been removed' : null ;

    this.props.dispatch(actionsUser.createOrEditRole(role, this.props.roleType, this.props.userInState.authToken, nameFields))
    .then(()=>{
      if (!role.id && role.capabilities !== 'admin') { // new admins unmount before this occurs
        // if no id, role is new, get id from store (put there by fetch upon create)
        this.setState({capabilities: role.capabilities, roleMessage, id: this.props.display.latestRole})
      } else {
        this.setState({capabilities: role.capabilities, roleMessage})
      }
      this.selectRole(null, null);
    })
  }

  render() {

    const isInFocus = this.props.display.idRole === this.state.idRole ? true : false; // using store, so that we only ever have 1 in focus
    const roleMessage = this.state.roleMessage ? <p>{this.state.roleMessage}</p> : null ;

    const renderDropdownList = ({ input, data, valueField, textField }) =>
    <DropdownList {...input}
      data={data}
      onChange={input.onChange} />

    const formattedLocation = helpers.formattedLocation(this.props.role);
    const location = formattedLocation ? <p className='previewCardText previewLocation hoverBlack'>{formattedLocation}</p> : null ;
    
    const displayName = helpers.formatUserName(this.props.role);;

    let selector;
    
    if (this.props.roleType === 'following') {
      const capabilities = this.state.capabilities === 'following' ? 'delete' : 'following' ;
      const followButtonLabel = this.state.capabilities === 'following' ? 'un-Follow' : 'Follow' ;
      selector = <button className='followButton' onClick={()=>this.setRole(capabilities)}>{followButtonLabel}</button>
    } else if (this.props.roleType === 'admin'  && isInFocus) {
      selector = <form className='selectAdmin'
        onSubmit={this.props.handleSubmit((values) => this.setRole(values))}>
        {/* <p>{this.state.role.firstName} {this.state.role.lastName} {this.state.role.organization}</p> */}
        <label
          className='inputLabel'
          htmlFor='capabilities'>Role
        </label>
        <Field
          name='capabilities'
          id='capabilities'
          component={renderDropdownList}
          data={this.props.general.roleTypes}
          className='inputField roleInputField' />
        <button className='submitButton'
          type="submit" disabled={this.props.submitting}>Save
        </button>
      </form>
    }

    let adminSelector = <div></div>;
    if (this.state.capabilities.includes('admin') && this.state.adminButtonLabel === 'edit') {
      adminSelector = <i
        onClick={() => this.selectRole(this.state.idRole, this.state.role.idUserReceiving)}
        className='fa fa-pencil editPencil' 
        aria-hidden="true">
        <div className='popover'>edit</div>
      </i>;
    } else if (this.state.capabilities.includes('admin')) {
      adminSelector = <button 
        className='responseButton' 
        onClick={() => this.selectRole(this.state.idRole, this.state.role.idUserReceiving)}>
        {this.state.adminButtonLabel}
      </button>;
    }

    const logo = this.props.role.logo ? this.props.role.logo : 'https://mave.me/img/projects/full_placeholder.png' ;

    return (
      <div className='previewCard'>
        <div className='previewCardInner' onClick={() => this.goToUser()}>
          <img className='previewCardLogo' src={logo} alt={`${displayName} logo`}></img> 
          <div className='previewCardTextContainer'>
            <h3 className='previewCardTitle hoverBlack'>{displayName}</h3>
            {location}
          </div>
        </div>
        <div className='previewBottomBar'>
          {adminSelector}
          {selector}
          {roleMessage}
        </div>
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