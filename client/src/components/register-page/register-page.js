import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { display } from '../../reducers/potential-states';
import * as actionsUser from '../../actions/user';

import './register-page.css';

export class RegisterPage extends Component {

  handleTypeChange(userType) {
    this.props.dispatch(actionsUser.setFormType(userType))
  }

  handleSubmitButton(input) {
    this.props.dispatch(actionsUser.createOrEditUser(input))
      .then(() => this.props.history.push('/'))
  }

  indivFormBody =
    <div>
      <label className='inputLabel' htmlFor={'firstName'}>FirstName</label>
      <Field className='firstNameInput' name='firstName' id='firstName'
        component='input' type='text' placeholder='First Name' required
      />

      <label className='inputLabel' htmlFor={'lastName'}>Last Name</label>
      <Field className='lastNameInput' name='lastName' id='lastName'
        component='input' type='text' placeholder='Last Name' required
      />
    </div>;

  orgFormBody =
    <div>
      <label className='inputLabel' htmlFor={'organization'}>Organization</label>
      <Field className='organizationInput' name='organization' id='organization'
        component='input' type='text' placeholder='Organization Name' required
      />
    </div>;

  render() {
    this.formBody = this.props.user.formType === 'individual' ? this.indivFormBody : this.orgFormBody;

    return (
      <main>
        <form className='registerForm'
          onSubmit={this.props.handleSubmit((values) => this.handleSubmitButton(values))}
        >
          <label className='inputLabel' htmlFor={'userTypeI'}>Individual</label>
          <Field className='userTypeInput' name='userType' id='userTypeI'
            component='input' type='radio' value='individual' onChange={() => this.handleTypeChange('individual')}
          />

          <label className='inputLabel' htmlFor={'userTypeO'}>Organization</label>
          <Field className='userTypeInput' name='userType' id='userTypeO'
            component='input' type='radio' value='organization' onChange={() => this.handleTypeChange('organization')}
          />

          {this.formBody}

          <label className='inputLabel' htmlFor={'username'}>Username</label>
          <Field className='usernameInput' name='username' id='username'
            component='input' type='text' placeholder='Email Address' required
          />

          <label className='inputLabel' htmlFor={'password'}>Password</label>
          <Field className='passwordInput' name='password' id='password'
            component='input' type='password' placeholder='Password' required
          />

          <label className='inputLabel' htmlFor={'password2'}>Confirm Password</label>
          <Field className='passwordInput' name='password2' id='password2'
            component='input' type='password' placeholder='Confirm Password' required
          />

          <button type='submit'>Sign Up</button>
        </form>
      </main>
    );
  }
}

export const mapStateToProps = state => ({
  user: state.user,
  display: state.display.view
});

export default compose(
  connect(mapStateToProps),
  reduxForm({ form: 'registerForm' })
)(RegisterPage);