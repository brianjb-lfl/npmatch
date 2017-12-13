import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import OrganizationPreview from '../organization-preview/organization-preview';

export default class LandingPage extends Component {

  render() {
    let previews = this.props.usersList.map((user, key) => (
      <Link to={`/profiles/${user.id}`}>
        <OrganizationPreview user={user} key={key} /> 
      </Link>
    )
    );

    return (
      <div>
        {previews}
      </div>
    )
  }
}