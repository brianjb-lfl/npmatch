import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import DropdownList from 'react-widgets/lib/DropdownList'
import SelectList from 'react-widgets/lib/SelectList'
import Multiselect from 'react-widgets/lib/Multiselect'
import 'react-widgets/dist/css/react-widgets.css'


import { display } from '../../reducers/potential-states';
import * as actionsUser from '../../actions/user';

export class UserProfileEdit extends Component {
  
  handleSubmitButton(input) {
    const user = Object.assign({},input);
    user.id = this.props.user.id;
    console.log('user',user)
    const isNew = false;
    
    this.props.dispatch(actionsUser.createOrEditUser(user, isNew, this.props.user.authToken, isNew))
      .then(() => this.props.history.push(`/profiles/${this.props.user.id}`))
  }

  render() {

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
    
    return (
      <main>

        <form className='userProfile'
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
            <button 
              type="submit" disabled={this.props.pristine || this.props.submitting}>Save
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

  const initialForm = Object.assign({},state.user)

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
  reduxForm({ form: 'userProfile' })
)(UserProfileEdit);