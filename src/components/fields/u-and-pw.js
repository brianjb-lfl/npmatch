import React, { Component } from 'react';
import { Field } from 'redux-form';

export default class UandPFields extends Component {

  render() {
    const confirmPw = this.props.confirm ?
      <div className='labelInputPair'>
        <label className='inputLabel' htmlFor={'password2'}>Confirm</label>
      <Field className='inputField passwordInput' name='password2' id='password2'
        component='input' type='password' placeholder='Confirm Password' required />
      </div>
      : null ;

    return (
      <div className='userNameAndPasswordContainer'>
        <div className='labelInputPair'>
          <label className='inputLabel' htmlFor={'username'}>Username</label>
            <Field className='inputField usernameInput' name='username' id='username'
              component='input' type='text' placeholder='Email Address' required />
        </div>
        <div className='labelInputPair'>
          <label className='inputLabel' htmlFor={'password'}>Password</label>
            <Field className='inputField passwordInput' name='password' id='password'
              component='input' type='password' placeholder='Password' required />
        </div>
        {confirmPw}
      </div>
    );
  }
}