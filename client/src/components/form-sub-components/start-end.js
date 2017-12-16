import React, { Component } from 'react';
import { Field } from 'redux-form';
import DateTimePicker from 'react-widgets/lib/DateTimePicker'
import Moment from 'moment';
import momentLocalizer from 'react-widgets-moment'; 

export default class StartEndForm extends Component {

  render() {

    Moment.locale('en')
    momentLocalizer()
  
    const renderDateTimePicker = ({ input: { onChange, value }, showTime }) =>
      <DateTimePicker
        onChange={onChange}
        format={Moment().format()}
        time={showTime}
        />
    
    return (
      <div>
        <div>
          <Field
            name="timestampStart"
            id="timestampStart"
            component={renderDateTimePicker}
            className='opportunityInput'/>
          <label 
            className='inputLabel' 
            htmlFor={'timestampStart'}>Start
          </label>
        </div>

        <div>
          <Field
            name="timestampEnd"
            id="timestampEnd"
            component={renderDateTimePicker}
            className='opportunityInput'/>
          <label 
            className='inputLabel' 
            htmlFor={'timestampEnd'}>End
          </label>
        </div>

      </div>
    );
  }
}