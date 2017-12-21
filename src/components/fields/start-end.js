import React, { Component } from 'react';
import { Field } from 'redux-form';
import DateTimePicker from 'react-widgets/lib/DateTimePicker'
import Moment from 'moment';
import momentLocalizer from 'react-widgets-moment';

export default class StartEndFields extends Component {

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
          <label
            className='inputLabel'
            htmlFor={'timestampStart'}>Start
          </label>
          <Field
            name="timestampStart"
            id="timestampStart"
            component={renderDateTimePicker}
            className='inputField' />
        </div>

        <div>
          <label
            className='inputLabel'
            htmlFor={'timestampEnd'}>End
          </label>
          <Field
            name="timestampEnd"
            id="timestampEnd"
            component={renderDateTimePicker}
            className='inputField' />
        </div>

      </div>
    );
  }
}