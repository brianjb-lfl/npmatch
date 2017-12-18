import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import 'react-widgets/dist/css/react-widgets.css'

import * as actionsUser from '../../actions/user';
import UandPwFields from '../fields/u-and-pw';

export class UserEditUandPwForm extends Component {
  
  handleSubmitButton(user) {
    console.log('user',user)
    const isNew = false;
    
    this.props.dispatch(actionsUser.createOrEditUser(user, isNew, this.props.initialValues.authToken))
      .then(() => this.props.history.push(`/profiles/${this.props.initialValues.id}`))
  }

  render() {
    
    return (
      <form className='userProfile'
        onSubmit={this.props.handleSubmit((values) => this.handleSubmitButton(values))}
      >
        <UandPwFields confirm={true}/>

        <div>
          <button className='submitButton'
            type="submit" disabled={this.props.pristine || this.props.submitting}>Save
          </button>
          <button className='clearFormButton'
            type="button" disabled={this.props.pristine || this.props.submitting} 
            onClick={this.props.reset}>Clear Form
          </button>
        </div>
      </form>
    );
  }
}


export const mapStateToProps = state => ({
  initialValues: state.user,
});

export default compose(
  connect(mapStateToProps),
  reduxForm({ form: 'userEditUandPw' })
)(UserEditUandPwForm);