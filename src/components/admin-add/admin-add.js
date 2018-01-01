import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import './admin-add.css';
import * as actionsUsersList from '../../actions/users-list';
import * as actionsDisplay from '../../actions/display';

export class AdminAdd extends Component {

  searchUsers(formValues) {
    console.log('window',window)
    this.props.dispatch(actionsUsersList.fetchUsersList(formValues))
    .then(()=>{
      this.props.dispatch(actionsDisplay.changeDisplay('addAdmin')) // using store as affects parent component
      window.scrollTo(0,this.state.searchBoxY -40)
    })
  }

  getCoords(event){
    this.setState({searchBoxY: event.target.offsetTop})
  }

  render() {

    return (
      <div>
        <form className='opportunityResponse'
          onSubmit={this.props.handleSubmit(formValues => this.searchUsers(formValues))} >

          <div>
            <Field
              name='user'
              id='user'
              component='input'
              type='text'
              placeholder='first and/or last name'
              className='inputField'
              onChange={event=>this.getCoords(event)} />
            <label
              className='inputLabel'
              htmlFor={'user'}>user's first and/or last name
            </label>
          </div>
          <button className='submitButton'
            type="submit" disabled={this.props.pristine || this.props.submitting}>search users
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
