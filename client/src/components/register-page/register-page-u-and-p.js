import React, { Component } from 'react';
import { Field } from 'redux-form';

export default class UandPForm extends Component {

  render() {

    return (
      <div>
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
      </div>
    );
  }
}