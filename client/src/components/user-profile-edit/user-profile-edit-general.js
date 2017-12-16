import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import 'react-widgets/dist/css/react-widgets.css'

import * as actionsUser from '../../actions/user';
import IndivNameForm from '../form-sub-components/name-indiv';
import OrgNameForm from '../form-sub-components/name-org';
import LocationForm from '../form-sub-components/location';
import CausesForm from '../form-sub-components/causes';
import SkillsForm from '../form-sub-components/skills';

export class UserEditGeneralForm extends Component {
  
  handleSubmitButton(input) {
    const user = Object.assign({},input);
    user.id = this.props.user.id;
    console.log('user',user)
    const isNew = false;
    
    this.props.dispatch(actionsUser.createOrEditUser(user, isNew, this.props.user.authToken, isNew))
      .then(() => this.props.history.push(`/profiles/${this.props.user.id}`))
  }

  render() {

    const nameForm = this.props.user.userType === 'individual' ? <IndivNameForm/> : <OrgNameForm/>;
    
    return (
      <form className='userProfile'
        onSubmit={this.props.handleSubmit((values) => this.handleSubmitButton(values))}
      >

        {nameForm}

        <div>
          <Field
            name='bio'
            id='bio'
            component='input'
            type='text'              
            className='opportunityInput' />
          <label 
            className='inputLabel' 
            htmlFor={'bio'}>Bio
          </label>
        </div>

        <CausesForm/>
        <SkillsForm/>
        <LocationForm/>

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
)(UserEditGeneralForm);