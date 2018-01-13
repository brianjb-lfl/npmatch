import React, { Component } from 'react';
import { Field } from 'redux-form';

export default class OrgNameFields extends Component {

  render() {

    return (
      <div className='labelInputPair'>
        <label className='inputLabel' htmlFor={'organization'}>Organization</label>
        <Field className='inputField' name='organization' id='organization'
          component='input' type='text' placeholder='Organization Name' required
        />
      </div>
    );
  }
}