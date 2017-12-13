import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { display } from '../../reducers/potential-states';
import * as userActions from '../../actions/user';

export class LoginPage extends Component {
  handleSubmitButton(input) {
    this.props.dispatch(userActions.login(input))
    .then(() => this.props.history.push('/'))
  }

  render() {
    return (
      <form className='loginForm'
        onSubmit={this.props.handleSubmit((values) => this.handleSubmitButton(values))}
      >
        <Field className='usernameInput' name='username' id='username'
          component='input' type='text' placeholder='Email Address' required
        />
        <Field className='passwordInput' name='password' id='password'
          component='input' type='text' placeholder='Password' required
        />
        <button type='submit'>Sign Up</button>
      </form>
    );
  }
}

export const mapStateToProps = state => ({
  user: state.user,
  display: state.display.view
});

export default compose(
  connect(mapStateToProps),
  reduxForm({ form: 'loginForm' })
)(LoginPage);