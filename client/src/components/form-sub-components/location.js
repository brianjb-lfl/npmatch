import React, { Component } from 'react';
import { Field } from 'redux-form';
import { connect } from 'react-redux';
import DropdownList from 'react-widgets/lib/DropdownList'

export class LocationForm extends Component {

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
            name='locationCity'
            id='locationCity'
            component='input'
            type='text'
            className='opportunityInput'/>
          <label 
            className='inputLabel' 
            htmlFor={'locationCity'}>City
          </label>
        </div>

        <div>
          <Field
            name='locationState'
            id='locationState'
            component={renderDropdownList}
            data={this.props.general.states}
            textField='name'
            valueField='abbreviation'
            className='opportunityInput'/>              
          <label 
            className='inputLabel' 
            htmlFor={'locationState'}>State
          </label>
        </div>

        <div>
          <Field
            name='locationCountry'
            id='locationCountry'
            component={renderDropdownList}
            data={this.props.general.countries}
            textField='name'
            valueField='code'
            className='opportunityInput'/>              
          <label 
            className='inputLabel' 
            htmlFor={'locationCountry'}>Country
          </label>
        </div>
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  general: state.general
})
export default connect(mapStateToProps)(LocationForm);