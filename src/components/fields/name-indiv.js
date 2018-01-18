import React, { Component } from 'react';
import { Field } from 'redux-form';

export default class IndivNameFields extends Component {

  render() {

    return (
      <div className='nameInputContainer'>
        <div className='labelInputPair'>
          <label className='inputLabel' htmlFor={'firstName'}>First Name</label>
          <Field className='inputField' name='firstName' id='firstName'
            component='input' type='text' placeholder='First Name' required
          />
        </div>
        <div className='labelInputPair'>
          <label className='inputLabel' htmlFor={'lastName'}>Last Name</label>
          <Field className='inputField' name='lastName' id='lastName'
            component='input' type='text' placeholder='Last Name' required
          />
        </div>
      </div>
    );
  }
}