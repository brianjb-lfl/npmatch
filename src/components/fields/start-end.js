import React, { Component } from 'react';
import { Field } from 'redux-form';
import DateTimePicker from 'react-widgets/lib/DateTimePicker'
import Moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
import { connect } from 'react-redux';
import * as actionsDisplay from '../../actions/display';

export class StartEndFields extends Component {

  captureDateTime(dateTime){
    console.log(dateTime);
    // const newDateTime = Moment().format(dateTime);
    // console.log(newDateTime);
    this.props.dispatch(actionsDisplay.getDateTime(dateTime))
  }

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

export default connect()(StartEndFields);