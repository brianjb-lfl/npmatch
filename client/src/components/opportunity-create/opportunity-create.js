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

export class OpportunityCreate extends Component {
  
  handleSubmitButton(input, isNew) {
    const opp = Object.assign({},input);
    opp.userId = isNew ? this.props.user.id : opp.userId ;
    console.log('opp',opp)
    
    this.props.dispatch(actionsOpportunity.createOpportunity(opp, this.props.user.authToken, isNew))
      .then(() => this.props.history.push('/myopportunities'))
  }

  render() {

    const isNew = this.props.display === 'editOpportunity' ? false : true ;
    const submitLabel = isNew ? 'Post Opportunity' : 'Update Opportunity' ;

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
      <main>

        <form className='createOpportunity'
          onSubmit={this.props.handleSubmit((values) => this.handleSubmitButton(values, isNew))}
        >

          <div>
            <Field
              name='title'
              id='title'
              component='input'
              type='text'              
              className='inputField'
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
              className='inputField'
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
              className='inputField'
              required />              
            <label 
              className='inputLabel' 
              htmlFor={'opportunityType'}>Opportunity Type
            </label>
          </div>

          <CausesFields/>

          <div>
            <Field
              name='offer'
              id='offer'
              component={renderSelectList}
              data={this.props.general.offerTypes}
              className='inputField'
              required />              
            <label 
              className='inputLabel' 
              htmlFor={'offer'}>Give or Receive
            </label>
          </div>

          <LocationFields/>

          <div>
            <Field
              name='link'
              id='link'
              component='input'
              type='text'
              className='inputField'/>
            <label 
              className='inputLabel' 
              htmlFor={'link'}>Opportunity-Specific URL
            </label>
          </div>

          <StartEndFields/>
   
          <div>
            <button 
              type="submit" disabled={this.props.pristine || this.props.submitting}>{submitLabel}
            </button>
            <button 
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

  const initialForm = Object.assign({},state.opportunity)
  delete initialForm.responses;
  initialForm.userId = initialForm.userId ? initialForm.userId : state.user.id ;
  initialForm.causes = initialForm.causes ? initialForm.causes : null ;

  return {
  general: state.general,
  user: state.user,
  opportunity: state.opportunity,
  display: state.display.view,
  initialValues: initialForm
  }
};

export default compose(
  connect(mapStateToProps),
  reduxForm({ form: 'opportunityCreate' })
)(OpportunityCreate);