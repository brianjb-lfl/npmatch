import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './explore-page.css'
import DetailedOrganizationPreview from '../detailed-organization-preview/detailed-organization-preview';
import DetailedContributorPreview from '../detailed-contributor-preview/detailed-contributor-preview';


export class ExplorePage extends Component {

  render() {
    let previews;
    let title;

    if (this.props.match.url === '/organizations') {
      previews = Array.isArray(this.props.usersList) ?
        this.props.usersList.map((user, key) => {
        if (user.userType === 'organization') {
          return <Link to={`/profiles/${user.id}`} key={key} >
          <DetailedOrganizationPreview user={user} /> 
        </Link> } else {
          return;
        }
      }) : '' ;
      title = 'Explore Organizations' 

    } else {
      previews = Array.isArray(this.props.usersList) ?
        this.props.usersList.map((user, key) => {
        if (user.userType === 'individual') {
          return <Link to={`/profiles/${user.id}`} key={key} >
          <DetailedContributorPreview user={user} /> 
        </Link> } else {
          return;
        }
      }) : '' ;
      title = 'Explore Contributors'
    }

    return (
      <main className='explorePage'>
        <h2 className='sectionTitle'>{title}</h2>
        {previews}
      </main>
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
export default connect(mapStateToProps)(ExplorePage);