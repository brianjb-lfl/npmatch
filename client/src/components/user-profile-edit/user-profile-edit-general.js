import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import 'react-widgets/dist/css/react-widgets.css'

import * as actionsUser from '../../actions/user';
import IndivNameFields from '../fields/name-indiv';
import OrgNameFields from '../fields/name-org';
import LocationFields from '../fields/location';
import CausesFields from '../fields/causes';
import SkillsFields from '../fields/skills';

export class UserEditGeneralForm extends Component {
  
  handleSubmitButton(input) {
    const user = Object.assign({},input);
    user.id = this.props.user.id;
    console.log('user',user)
    const isNew = false;
    
    this.props.dispatch(actionsUser.createOrEditUser(user, isNew, this.props.user.authToken))
      .then(() => this.props.history.push(`/profiles/${this.props.user.id}`))
  }

  render() {

    const nameForm = this.props.user.userType === 'individual' ? 
    <IndivNameFields/> : <OrgNameFields/>;
    
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
            className='inputField' />
          <label 
            className='inputLabel' 
            htmlFor={'bio'}>Bio
          </label>
        </div>

        <LocationFields/>
        <CausesFields/>
        <SkillsFields/>

        <div>
          <Field
            name='availability'
            id='availability'
            component='input'
            type='text'
            className='inputField'/>
          <label 
            className='inputLabel' 
            htmlFor={'availability'}>Availability
          </label>
        </div>

        <div>
          <Field
            name='logo'
            id='logo'
            component='input'
            type='text'
            className='inputField'/>
          <label 
            className='inputLabel' 
            htmlFor={'logo'}>Logo URL
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
  initialForm.causes = initialForm.causes ? initialForm.causes : null ;
  initialForm.skills = initialForm.skills ? initialForm.skills : null ;

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