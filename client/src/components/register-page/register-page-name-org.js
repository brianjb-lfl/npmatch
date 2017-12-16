import React, { Component } from 'react';
import { Field } from 'redux-form';

export default class OrgNameForm extends Component {

  render() {

    return (
      <div>
        <label className='inputLabel' htmlFor={'organization'}>Organization</label>
        <Field className='organizationInput' name='organization' id='organization'
          component='input' type='text' placeholder='Organization Name' required
        />
      </div>
    );
  }
}