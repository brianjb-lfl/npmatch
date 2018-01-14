import React, { Component } from 'react';
import { Field } from 'redux-form';
import { connect } from 'react-redux';
import DropdownList from 'react-widgets/lib/DropdownList'

export class LinkFields extends Component {
  // if chaining multiple linkFields on a form, pass prop index to this component, then upon form submission, convert linkType0, linkType1, etc. into an array [{linkType, linkUrl}]

  render() {
    const index = typeof this.props.index === 'number' ? this.props.index : ''; // allows chaining of multiple link fields on one form
    const linkType = `linkType${index}`;
    const linkUrl = `linkUrl${index}`;
    
    const renderDropdownList = ({ input, data, valueField, textField }) =>
      <DropdownList {...input}
        data={data}
        valueField={valueField}
        textField={textField}
        onChange={input.onChange} />

    return (
        <div className='labelInputPair linkFieldContainer'>
          <label
            className='inputLabel'
            htmlFor={linkType}>Link
          </label>
          <Field
            name={linkType}
            id={linkType}
            component={renderDropdownList}
            data={this.props.general.linkTypes}
            className='inputField' />
          <Field
            name={linkUrl}
            id={linkUrl}
            component='input'
            type='text'
            className='inputField' />
        </div>
    );
  }
}

export const mapStateToProps = state => ({
  general: state.general
})
export default connect(mapStateToProps)(LinkFields);