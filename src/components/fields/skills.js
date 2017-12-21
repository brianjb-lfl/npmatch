import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import Multiselect from 'react-widgets/lib/Multiselect'

export class SkillsFields extends Component {

  render() {

    const renderMultiselect = ({ input, data, valueField, textField }) =>
      <Multiselect {...input}
        onBlur={() => input.onBlur()}
        value={input.value || []} // requires value to be an array
        data={data}
        valueField={valueField}
        textField={textField} />

    return (
      <div>
        <label
          className='inputLabel'
          htmlFor={'skills'}>Skills
        </label>
        <Field
          name='skills'
          id='skills'
          component={renderMultiselect}
          data={this.props.general.skills}
          className='inputField' />
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  general: state.general
})
export default connect(mapStateToProps)(SkillsFields);