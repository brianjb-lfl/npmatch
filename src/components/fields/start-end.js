import React, { Component } from 'react';
import { Field, formValueSelector } from 'redux-form';
import DateTimePicker from 'react-widgets/lib/DateTimePicker'
import Moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
import { connect } from 'react-redux';
import * as helpers from '../../actions/helpers';

export class StartEndFields extends Component {
  constructor(props){
    super(props);
    this.state = {
      start: this.props.timestampStart,
      end: this.props.timestampEnd,
    }
  }

  componentDidUpdate(){
    console.log('~~~~~');
    console.log('updating');
    console.log('dates to compare: prior', this.state.start, 'current', this.props.timestampStart);
    const startChanged = !helpers.datesAreEqual(this.state.start, this.props.timestampStart) ;
    const whichChanged = startChanged ? 'start' : 'end' ;
    console.log('%%%');
    console.log('startChanged',startChanged)
    console.log('whichChanged',whichChanged)
    console.log('prior start', this.state.start)
    console.log('current Start', this.props.timestampStart)
    console.log('prior start', this.state.end)
    console.log('current Start', this.props.timestampEnd)
    const prior = whichChanged === 'start' ? this.state.start : this.state.end ;
    const current = whichChanged === 'start' ? this.props.timestampStart : this.props.timestampEnd ;
    const conformedDate = helpers.resolveDateTimeConflicts(prior, current);
    console.log('conformedDate',conformedDate);
    // this.setState({[whichChanged]: conformedDate})
    console.log('~~~~~');

  }
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
            {helpers.printDateAsString(this.state.start)}
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
            {helpers.printDateAsString(this.state.end)}
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