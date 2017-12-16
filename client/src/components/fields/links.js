import React, { Component } from 'react';
import { Field } from 'redux-form';
import { connect } from 'react-redux';
import DropdownList from 'react-widgets/lib/DropdownList'

export class LocationFields extends Component {

  render() {

    const renderDropdownList = ({ input, data, valueField, textField }) =>
    <DropdownList {...input}
      data={data}
      valueField={valueField}
      textField={textField}
      onChange={input.onChange} />

    return (
      <div>
        <div>
          <Field
            name='linkType'
            id='linkType'
            component={renderDropdownList}
            data={this.props.general.linkTypes}
            className='inputField'/>
          <label 
            className='inputLabel' 
            htmlFor={'linkType'}>Link Type
          </label>
        </div>

        <div>
          <Field
            name='linkURL'
            id='linkURL'
            component='input'
            type='text'
            className='inputField'/>
          <label 
            className='inputLabel' 
            htmlFor={'linkURL'}>Link
          </label>
        </div>

      </div>
    );
  }
}

export const mapStateToProps = state => ({
  general: state.general
})
export default connect(mapStateToProps)(LocationFields);