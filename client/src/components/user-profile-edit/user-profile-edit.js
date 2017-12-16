import React, { Component } from 'react';
import 'react-widgets/dist/css/react-widgets.css'

import UserEditGeneralForm from './user-profile-edit-general';
import UserEditUandPwForm from './user-profile-edit-u-and-pw';

export default class UserProfileEdit extends Component {

  render() {
    
    return (
      <main>
        <div>
          <h3>Edit Profile</h3>
          <UserEditGeneralForm/>
        </div>
        <div>
          <h3>Update Username and Password</h3>
          <UserEditUandPwForm/>
        </div>
      </main>
    );
  }
}