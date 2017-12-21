import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import DropdownList from 'react-widgets/lib/DropdownList'
import SelectList from 'react-widgets/lib/SelectList'
import 'react-widgets/dist/css/react-widgets.css'

import * as actionsOpportunity from '../../actions/opportunity';
import LocationFields from '../fields/location';
import CausesFields from '../fields/causes';
import StartEndFields from '../fields/start-end';

import './opportunity-create.css'
import { getAdminInitializeRes } from '../../actions/api-response-checks';

export class OpportunityCreate extends Component {

  convertToTimeStamp(timeStamp) {
    // is GMT string (but we are working with raw date below) Thu, 30 Nov 2017 21:23:45 GMT
    // is desired format "2017-12-21T16:26:48-05:00"
    return `${timeStamp.getFullYear()}-${timeStamp.getMonth()}-${timeStamp.getDate()}T${timeStamp.getHours()}:${timeStamp.getMinutes()}:${timeStamp.getSeconds()}-05:00`;
  }

  handleSubmitButton(input, isNew) {
    // console.log('raw input from redux form',input)
  //   const startDate = input.timestampStart;
  //   console.log(startDate instanceof Date)
  //   console.log(typeof startDate, startDate)
  // console.log(timeStamp);
  //   console.log(typeof startDate.toGMTString(),startDate.toGMTString())
  //   // console.log(startDate instanceof Moment)
    const opp = {...input};
    opp.timestampStart = this.convertToTimeStamp(opp.timestampStart)
    opp.timestampEnd = this.convertToTimeStamp(opp.timestampEnd)
    opp.userId = isNew ? this.props.user.id : opp.userId;
    // console.log('opp to submit', opp)

    this.props.dispatch(actionsOpportunity.createOpportunity(opp, this.props.user.authToken, isNew))
      .then(() => this.props.history.push('/myopportunities'))
  }

  render() {

    const isNew = this.props.display.view === 'editOpportunity' ? false : true;
    const submitLabel = isNew ? 'Post Opportunity' : 'Update Opportunity';

    const renderDropdownList = ({ input, data, valueField, textField }) =>
      <DropdownList {...input}
        data={data}
        valueField={valueField}
        textField={textField}
        onChange={input.onChange} />

    const renderSelectList = ({ input, data }) =>
      <SelectList {...input}
        onBlur={() => input.onBlur()}
        data={data} />


    return (
      <main className='createOpportunity'>
        <h2>Opportunity</h2>

        <form className='opportunityForm'
          onSubmit={this.props.handleSubmit((values) => this.handleSubmitButton(values, isNew))}
        >

          <div>
            <label
              className='inputLabel'
              htmlFor={'title'}>Opportunity Title
            </label>
            <Field
              name='title'
              id='title'
              component='input'
              type='text'
              className='inputField'
              required />
          </div>

          <div>
            <label
              className='inputLabel'
              htmlFor={'narrative'}>Describe This Opportunity
            </label>
            <Field
              name='narrative'
              id='narrative'
              component='input'
              type='text'
              className='inputField'
              required />
          </div>

          <div>
            <label
              className='inputLabel'
              htmlFor={'opportunityType'}>Opportunity Type
            </label>
            <Field
              name='opportunityType'
              id='opportunityType'
              component={renderDropdownList}
              data={this.props.general.oppTypes}
              textField='type'
              valueField='type'
              className='inputField'
              required />
          </div>

          <CausesFields />

          <div>
            <label
              className='inputLabel'
              htmlFor={'offer'}>Give or Receive
            </label>
            <Field
              name='offer'
              id='offer'
              component={renderSelectList}
              data={this.props.general.offerTypes}
              className='inputField'
              required />
          </div>

          <LocationFields />

          <div>
            <label
              className='inputLabel'
              htmlFor={'link'}>Opportunity-Specific URL
            </label>
            <Field
              name='link'
              id='link'
              component='input'
              type='text'
              className='inputField' />
          </div>

          <StartEndFields />

          <div>
            <button className='submitButton'
              type="submit" disabled={this.props.pristine || this.props.submitting}>{submitLabel}
            </button>
            <button className='clearButton'
              type="button" disabled={this.props.pristine || this.props.submitting}
              onClick={this.props.reset}>Clear Form
            </button>
          </div>

        </form>

      </main>
    );
  }
}


export const mapStateToProps = state => {

  const initialForm = {...state.opportunity}
  delete initialForm.responses;
  delete initialForm.organization;
  initialForm.userId = initialForm.userId ? initialForm.userId : state.user.id;
  initialForm.causes = initialForm.causes ? initialForm.causes : null;

  return {
    general: state.general,
    user: state.user,
    opportunity: state.opportunity,
    display: state.display,
    initialValues: initialForm
  }
};

export default compose(
  connect(mapStateToProps),
  reduxForm({ form: 'opportunityCreate' })
)(OpportunityCreate);