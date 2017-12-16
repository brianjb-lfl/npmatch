import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { display } from '../../reducers/potential-states';
import * as actionsUser from '../../actions/user';
import IndivNameForm from './register-page-name-indiv';
import OrgNameForm from './register-page-name-org';
import UandPForm from './register-page-u-and-p';

import './register-page.css';

export class RegisterPage extends Component {

  handleFormTypeChange(userType) {
    this.props.dispatch(actionsUser.setFormType(userType))
  }

  handleSubmitButton(input) {
    this.props.dispatch(actionsUser.createOrEditUser(input))
      .then(() => this.props.history.push(`/profiles/${this.props.user.id}`))
  }


  render() {
    const nameForm = this.props.user.formType === 'individual' ? <IndivNameForm/> : <OrgNameForm/>;

    return (
      <main>
        <form className='registerForm'
          onSubmit={this.props.handleSubmit((values) => this.handleSubmitButton(values))}
        >
          <label className='inputLabel' htmlFor={'userTypeI'}>Individual</label>
          <Field className='userTypeInput' name='userType' id='userTypeI'
            component='input' type='radio' value='individual' onChange={() => this.handleFormTypeChange('individual')}
          />

          <label className='inputLabel' htmlFor={'userTypeO'}>Organization</label>
          <Field className='userTypeInput' name='userType' id='userTypeO'
            component='input' type='radio' value='organization' onChange={() => this.handleFormTypeChange('organization')}
          />

          {nameForm}

          <UandPForm/>

          <button type='submit'>Sign Up</button>
        </form>
      </main>
    );
  }
}

export const mapStateToProps = state => ({
  user: state.user,
  display: state.display.view
});

export default compose(
  connect(mapStateToProps),
  reduxForm({ form: 'registerForm' })
)(RegisterPage);