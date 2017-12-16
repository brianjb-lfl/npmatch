import React, { Component } from 'react';
import { Field } from 'redux-form';

export default class IndivNameFields extends Component {

  render() {

    return (
      <div>
        <label className='inputLabel' htmlFor={'firstName'}>FirstName</label>
        <Field className='inputField' name='firstName' id='firstName'
          component='input' type='text' placeholder='First Name' required
        />

        <label className='inputLabel' htmlFor={'lastName'}>Last Name</label>
        <Field className='inputField' name='lastName' id='lastName'
          component='input' type='text' placeholder='Last Name' required
        />
      </div>
    );
  }
}