import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import './admin-add.css';
import * as actionsUser from '../../actions/user';
import * as actionsUsersList from '../../actions/users-list';
import * as actionsDisplay from '../../actions/display';

export class AdminAdd extends Component {

  searchUsers(formValues) {
    this.props.dispatch(actionsUsersList.fetchUsersList(formValues));
    // toggle so that list of potential admins show
    // each potential admin to have a preview that allows selecting as an admin
  }

  render() {

    return (
      <div>
        <form className='opportunityResponse'
          onSubmit={this.props.handleSubmit(formValues => this.searchUsers(formValues))} >

          <div>
            <Field
              name='user'
              id='iser'
              component='input'
              type='text'
              placeholder='first and/or last name'
              className='inputField' />
            <label
              className='inputLabel'
              htmlFor={'user'}>user's first and/or last name
            </label>
          </div>;
          <button className='submitButton'
            type="submit" disabled={this.props.submitting}>search users
          </button>
        </form>
      </div>
    );
  }
}

export default compose(
  connect(),
  reduxForm({ form: 'adminAdd' })
)(AdminAdd);
