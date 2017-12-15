import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import DropdownList from 'react-widgets/lib/DropdownList'
import SelectList from 'react-widgets/lib/SelectList'
import Multiselect from 'react-widgets/lib/Multiselect'
import DateTimePicker from 'react-widgets/lib/DateTimePicker'
import 'react-widgets/dist/css/react-widgets.css'

import Moment from 'moment';
import momentLocalizer from 'react-widgets-moment'; 

import { display } from '../../reducers/potential-states';
import * as actionsOpportunity from '../../actions/opportunity';

export class OpportunityCreate extends Component {
  
  handleSubmitButton(input) {
    this.props.dispatch(actionsOpportunity.createOpportunity(input))
      .then(() => this.props.history.push('/'))
  }

  render() {

    Moment.locale('en')
    momentLocalizer()

    const renderDropdownList = ({ input, data, valueField, textField }) =>
    <DropdownList {...input}
      data={data}
      valueField={valueField}
      textField={textField}
      onChange={input.onChange} />
  
  const renderMultiselect = ({ input, data, valueField, textField }) =>
    <Multiselect {...input}
      onBlur={() => input.onBlur()}
      value={input.value || []} // requires value to be an array
      data={data}
      valueField={valueField}
      textField={textField} />
  
  const renderSelectList = ({ input, data }) =>
    <SelectList {...input}
      onBlur={() => input.onBlur()}
      data={data} />
  
  const renderDateTimePicker = ({ input: { onChange, value }, showTime }) =>
    <DateTimePicker
      onChange={onChange}
      format={Moment().format()}
      time={showTime}
       />
    
    return (
      <main>

        <form className='createOpportunity'
          onSubmit={this.props.handleSubmit((values) => this.handleSubmitButton(values))}
        >

          <div>
            <Field
              name='title'
              id='title'
              component='input'
              type='text'              
              className='opportunityInput'
              required />
            <label 
              className='inputLabel' 
              htmlFor={'title'}>Opportunity Title
            </label>
          </div>

          <div>
            <Field
              name='narrative'
              id='narrative'
              component='input'
              type='text'              
              className='opportunityInput'
              required />
            <label 
              className='inputLabel' 
              htmlFor={'narrative'}>Describe This Opportunity
            </label>
          </div>

          <div>
            <Field
              name='opportunityType'
              id='opportunityType'
              component={renderDropdownList}
              data={this.props.general.oppTypes}
              textField='type'
              valueField='type'
              className='opportunityInput'
              required />              
            <label 
              className='inputLabel' 
              htmlFor={'opportunityType'}>Opportunity Type
            </label>
          </div>

          <div>
            <Field
              name='causes'
              id='causes'
              component={renderMultiselect}
              data={this.props.general.causes}
              className='opportunityInput'/>              
            <label 
              className='inputLabel' 
              htmlFor={'causes'}>Causes
            </label>
          </div>

          <div>
            <Field
              name='offer'
              id='offer'
              component={renderSelectList}
              data={this.props.general.offerTypes}
              className='opportunityInput'
              required />              
            <label 
              className='inputLabel' 
              htmlFor={'offer'}>Give or Receive
            </label>
          </div>

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

          <div>
            <Field
              name='link'
              id='link'
              component='input'
              type='text'
              className='opportunityInput'/>
            <label 
              className='inputLabel' 
              htmlFor={'link'}>Opportunity-Specific URL
            </label>
          </div>

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


          <div>
            <button 
              type="submit" disabled={this.props.pristine || this.props.submitting}>Post Opportunity
            </button>
            <button 
              type="button" disabled={this.props.pristine || this.props.submitting} 
              onClick={this.props.reset}>Reset Values
            </button>
          </div>

        </form>

      </main>
    );
  }
}


export const mapStateToProps = state => {

  const initialForm = Object.assign({},state.opportunity)
  delete initialForm.responses;
  initialForm.idUser = initialForm.idUser ? initialForm.idUser : state.user.id ;
  initialForm.causes = initialForm.causes ? initialForm.causes : null ;

  return {
  general: state.general,
  opportunity: state.opportunity,
  display: state.display.view,
  initialValues: initialForm
  }
};

export default compose(
  connect(mapStateToProps),
  reduxForm({ form: 'opportunityCreate' })
)(OpportunityCreate);