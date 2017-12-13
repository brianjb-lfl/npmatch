import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { display } from '../../reducers/potential-states';
import * as userActions from '../../actions/user';

export default class RegisterPage extends Component {
  handleSubmitButton(input) {
    this.props.dispatch(userActions.registerUser(input))
    .then(() => this.props.history.push('/'))
  }

  formBody;
  
  handleTypeChange(userType){
    if (userType === 'individual') {
      this.formBody = <div>
        <Field className='firstNameInput' name='firstName' id='firstName'
          component='input' type='text' placeholder='First Name' required
        />
        <label className='inputLabel' htmlFor={firstName}>FirstName</label>

        <Field className='lastNameInput' name='lastName' id='lastName'
          component='input' type='text' placeholder='Last Name' required
        />
        <label className='inputLabel' htmlFor={lastName}>Last Name</label>
      </div>
    } else {
      this.formBody = <div>
        <Field className='organizationInput' name='organization' id='organization'
          component='input' type='text' placeholder='Organization Name' required
        />
        <label className='inputLabel' htmlFor={organization}>Organization</label>
      </div>
    }
  }

  render() {

    return (
      <form className='registerForm'
        onSubmit={this.props.handleSubmit((values) => this.handleSubmitButton(values))}
      >
        <Field className='userTypeInput' name='userType' id='userTypeI'
          component='input' type='radio' value='individual' onChange={(value)=>this.handleTypeChange(value)}
        />
        <label className='inputLabel' htmlFor={userTypeI}>Individual</label>
        <Field className='userTypeInput' name='userType' id='userTypeO'
          component='input' type='radio' value='organization' onChange={(value)=>this.handleTypeChange(value)}
        />
        <label className='inputLabel' htmlFor={userTypeI}>Organization</label>

        {this.formBody}

        <Field className='usernameInput' name='username' id='username'
          component='input' type='text' placeholder='Email Address' required
        />
        <label className='inputLabel' htmlFor={username}>Username</label>

        <Field className='passwordInput' name='password' id='password'
          component='input' type='password' placeholder='Password' required
        />
        <label className='inputLabel' htmlFor={password}>Password</label>

        <Field className='passwordInput' name='password2' id='password2'
          component='input' type='password' placeholder='Confirm Password' required
        />
        <label className='inputLabel' htmlFor={password2}>Confirm Password</label>
        <button type='submit'>Sign Up</button>
      </form>
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