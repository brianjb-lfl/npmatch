import React, { Component } from 'react';
import { Field, formValueSelector } from 'redux-form';
import DateTimePicker from 'react-widgets/lib/DateTimePicker'
import Moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
import { connect } from 'react-redux';
import * as actionsOpportunity from '../../actions/opportunity';

export class DateTime extends Component {

  componentDidUpdate(){
    if(this.props.type === 'start' && this.props.timestampStart instanceof Date) {
      this.props.dispatch(actionsOpportunity.handleDateChanges('start', this.props.timestampStart))
    } else if(this.props.type === 'end'  && this.props.timestampEnd instanceof Date) {
      this.props.dispatch(actionsOpportunity.handleDateChanges('end', this.props.timestampEnd))
    }
  }

  render() {
    const fieldName = this.props.type === 'start' ? 'timestampStart' : 'timestampEnd' ;
    const fieldLabel = this.props.type === 'start' ? 'Start' : 'End' ;

    Moment.locale('en');
    momentLocalizer();
    const renderDateTimePicker = ({ input: { onChange, value }, showTime }) =>
      <DateTimePicker
        onChange={onChange}
        format={Moment().format()}
        time={showTime} />

    return (
      <div className='labelInputPair'>
        <label
          className='inputLabel'
          htmlFor={fieldName}>{fieldLabel}
        </label>
        <Field
          name={fieldName}
          id={fieldName}
          component={renderDateTimePicker}
          className='inputField' />
      </div>
    );
  }
}

export const mapStateToProps = state => {
  const selector = formValueSelector('opportunityCreate');
  return {
    timestampStart: selector(state, 'timestampStart'),
    timestampEnd: selector(state, 'timestampEnd'),
  }
};

export default connect(mapStateToProps)(DateTime);