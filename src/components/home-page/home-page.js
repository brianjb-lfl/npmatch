import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import OrganizationPreview from '../organization-preview/organization-preview';
// import ContributorPreview from '../contributor-preview/contributor-preview';

import './home-page.css';

export class HomePage extends Component {
  render() {
    let previews = Array.isArray(this.props.usersList) ?
      this.props.usersList.map((user, key) => {
      if (user.userType === 'organization') {
        return  <OrganizationPreview user={user} key={key} history={this.props.history}/> 
       } else {
        return;
      }
      }) : '' ;

    return (
      <div className='homePage'>
        <h2 className='sectionTitle'>Explore those enrolled in NPM</h2>
        {previews}
      </div>
    )
  }
}

export const mapStateToProps = state => ({
  user: state.user,
  userViewed: state.userViewed,
  usersList: state.usersList.main,
  opportunity: state.opportunity,
  opportunitiesList: state.opportunitiesList,
  display: state.display.view,
})
export default connect(mapStateToProps)(HomePage);