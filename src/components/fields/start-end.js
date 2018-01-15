import React, { Component } from 'react';
import { Field, formValueSelector } from 'redux-form';
import DateTimePicker from 'react-widgets/lib/DateTimePicker'
import Moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
import { connect } from 'react-redux';
import * as helpers from '../../actions/helpers';

export class StartEndFields extends Component {

  render() {
    console.log(this.props);
    console.log(this.state);

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
        <div className='labelInputPair'>
          <label
            className='inputLabel'
            htmlFor={'timestampStart'}>Start
          </label>
          <Field
            name="timestampStart"
            id="timestampStart"
            component={renderDateTimePicker}
            className='inputField' />
          <div className='formattedDate'>
            {helpers.printDateAsString(this.props.timestampStart)}
          </div>
        </div>

        <div className='labelInputPair'>
          <label
            className='inputLabel'
            htmlFor={'timestampEnd'}>End
          </label>
          <Field
            name="timestampEnd"
            id="timestampEnd"
            component={renderDateTimePicker}
            className='inputField' />
          <div className='formattedDate'>
            {helpers.printDateAsString(this.props.timestampEnd)}
          </div>
        </div>

      </div>
    );
  }
}

export const mapStateToProps = state => {
  const selector = formValueSelector('opportunityCreate');//state.display.formName)
  return {
    timestampStart: selector(state, 'timestampStart'),
    timestampEnd: selector(state, 'timestampEnd'),
  }
};

export default connect(mapStateToProps)(StartEndFields);