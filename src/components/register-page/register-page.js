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
  constructor(props){
    super(props);
    this.state = {
      formType: 'individual'
    }
  }

  handleFormTypeChange(userType) {
    this.setState({formType: userType})
    // this.props.dispatch(actionsUser.setFormType(userType));
  }

  handleSubmitButton(input) {
    this.props.dispatch(actionsUser.createOrEditUser(input))
      .then(() => {
        this.props.history.push(`/profiles/${this.props.display.userId}`)
      })
  }


  render() {
    const nameForm = this.state.formType === 'individual' ?
      <IndivNameFields /> : <OrgNameFields />;
    
    const indivButtonClassName = this.state.formType === 'individual' ? 'selectedOptionLabel' : 'deSelectedOptionLabel' ;
    const orgButtonClassName = this.state.formType === 'organization' ? 'selectedOptionLabel' : 'deSelectedOptionLabel' ;
    
    return (
      <main>
        <h2 className='sectionTitle'>Register</h2>
        <form className='previewCard registerForm spacedForm'
          onSubmit={this.props.handleSubmit((values) => this.handleSubmitButton(values))} >
          <div className='selectOptionButtonContainer'>
            <label className={indivButtonClassName}
              htmlFor={'userTypeI'}>Individual</label>
            <Field className='userTypeInput' name='userType' id='userTypeI'
              style={{ display: 'none', margin: 'auto' }}
              component='input' type='radio' value='individual' onChange={() => this.handleFormTypeChange('individual')} />
            <label className={orgButtonClassName}
              htmlFor={'userTypeO'}>Organization</label>
            <Field className='userTypeInput' name='userType' id='userTypeO'
              style={{ display: 'none', margin: 'auto' }}
              component='input' type='radio' value='organization' onChange={() => this.handleFormTypeChange('organization')} />
          </div>

          {nameForm}

          <UandPwFields confirm={true} />
          <div className='submitButtonContainer'>
            <button className='submitButton fullWidth' type='submit'>Sign Up</button>
          </div>
        </form>
      </main>
    );
  }
}

export const mapStateToProps = state => ({
  user: state.user,
  display: state.display
});

export default compose(
  connect(mapStateToProps),
  reduxForm({ form: 'registerForm' })
)(RegisterPage);