import React, { Component } from 'react';
import { connect } from 'react-redux';

import 'react-widgets/dist/css/react-widgets.css'

import UserEditGeneralForm from './user-profile-edit-general';
import UserEditUandPwForm from './user-profile-edit-u-and-pw';
import UserEditLinksForm from './user-profile-edit-links';

import './user-profile-edit.css';

export class UserProfileEdit extends Component {

  render() {
    
    return (
      <main>
        <h3 className='sectionTitle'>Edit Profile</h3>
        <div className='editSection'>
          <UserEditGeneralForm history={this.props.history}/>
          <UserEditLinksForm/>
        </div>
        
        <h3 className='sectionTitle'>Update Username and Password</h3>
        <div className='editSection'>
          <UserEditUandPwForm history={this.props.history}/>
        </div>
      </main>
    );
  }
}

export default connect()(UserProfileEdit);