import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import * as actionsUser from '../../actions/user';
import IndivNameFields from '../fields/name-indiv';
import OrgNameFields from '../fields/name-org';
import UandPwFields from '../fields/u-and-pw';

import './register-page.css';

export class RegisterPage extends Component {

  handleFormTypeChange(userType) {
    this.props.dispatch(actionsUser.setFormType(userType));
  }

  handleSubmitButton(input) {
    this.props.dispatch(actionsUser.createOrEditUser(input))
      .then(() => this.props.history.push(`/profiles/${this.props.user.id}`))
  }


  render() {
    const nameForm = this.props.user.formType === 'individual' ?
      <IndivNameFields /> : <OrgNameFields />;

    return (
      <main>
        <h2 className='sectionTitle'>Register</h2>
        <form className='registerForm'
          onSubmit={this.props.handleSubmit((values) => this.handleSubmitButton(values))}
        >
          <div className='individualOption'>
            <label className='inputLabel'
              style={{
                backgroundColor: this.props.user.formType === 'individual' ? '#DA2536' : 'rgba(8, 46, 65, 0.1)',
                color: this.props.user.formType === 'individual' ? 'white' : '#082E41'
              }}
              htmlFor={'userTypeI'}>Individual</label>
            <Field className='userTypeInput' name='userType' id='userTypeI'
              style={{ display: 'none', margin: 'auto' }}
              component='input' type='radio' value='individual' onChange={() => this.handleFormTypeChange('individual')}
            />
          </div>

          <div className='organizationOption'>
            <label className='inputLabel'
              style={{
                backgroundColor: this.props.user.formType === 'organization' ? '#DA2536' : 'rgba(8, 46, 65, 0.1)',
                color: this.props.user.formType === 'organization' ? 'white' : '#082E41'
              }}
              htmlFor={'userTypeO'}>Organization</label>
            <Field className='userTypeInput' name='userType' id='userTypeO'
              style={{ display: 'none', margin: 'auto' }}
              component='input' type='radio' value='organization' onChange={() => this.handleFormTypeChange('organization')}
            />
          </div>

          {nameForm}

          <UandPwFields confirm={true} />

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