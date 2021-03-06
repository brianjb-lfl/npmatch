import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import * as actionsUser from '../../actions/user';
import UandPFields from '../fields/u-and-pw';

import './login-page.css';

export class LoginPage extends Component {
  handleSubmitButton(input) {
    this.props.dispatch(actionsUser.login(input))
      .then(() => {
        this.props.reset();        
        this.props.history.push('/');
      })
  }

  render() {
    return (
      <main>
        <h2 className='sectionTitle'>Log In</h2>
        <form className='loginForm'
          onSubmit={this.props.handleSubmit((values) => this.handleSubmitButton(values))} >
          <UandPFields/>
          <button className='submitButton loginButton fullWidth' type='submit'>Sign In</button>
        </form>
      </main>
    )
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