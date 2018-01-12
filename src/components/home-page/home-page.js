import React, { Component } from 'react';
import { connect } from 'react-redux';

import UserPreview from '../user-preview/user-preview';
// import ContributorPreview from '../contributor-preview/contributor-preview';

import './home-page.css';

export class HomePage extends Component {
  render() {
    let previews = Array.isArray(this.props.usersList) ?
      this.props.usersList.map((user, key) => {
      if (user.userType === 'organization') {
        return  <UserPreview user={user} key={key} history={this.props.history} showDetail={false}/> 
       } else {
        return null;
      }
      }) : '' ;

    return (
      <div className='homePage'>
        <h2 className='sectionTitle'>Explore those enrolled in CauseWay</h2>
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