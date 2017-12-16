import React, { Component } from 'react';
import 'react-widgets/dist/css/react-widgets.css'

import UserEditGeneralForm from './user-profile-edit-general';
import UserEditUandPwForm from './user-profile-edit-u-and-pw';
import UserEditLinksForm from './user-profile-edit-links';

export default class UserProfileEdit extends Component {

  render() {
    
    return (
      <main>
        <div>
          <h3>Edit Profile</h3>
          <UserEditGeneralForm history={this.props.history}/>
          <UserEditLinksForm/>
        </div>
        <div>
          <h3>Update Username and Password</h3>
          <UserEditUandPwForm history={this.props.history}/>
        </div>
      </main>
    );
  }
}