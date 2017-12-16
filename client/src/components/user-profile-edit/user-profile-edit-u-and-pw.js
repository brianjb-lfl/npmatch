import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import 'react-widgets/dist/css/react-widgets.css'

import * as actionsUser from '../../actions/user';
import UandPForm from '../form-sub-components/u-and-p';

export class UserEditUandPwForm extends Component {
  
  handleSubmitButton(input) {
    const user = Object.assign({},input);
    user.id = this.props.user.id;
    console.log('user',user)
    const isNew = false;
    
    this.props.dispatch(actionsUser.createOrEditUser(user, isNew, this.props.user.authToken, isNew))
      .then(() => this.props.history.push(`/profiles/${this.props.user.id}`))
  }

  render() {
    
    return (
      <form className='userProfile'
        onSubmit={this.props.handleSubmit((values) => this.handleSubmitButton(values))}
      >
        <UandPForm confirm={true}/>

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


export const mapStateToProps = state => ({
  initialValues: state.user
});

export default compose(
  connect(mapStateToProps),
  reduxForm({ form: 'userEditUandPw' })
)(UserEditUandPwForm);