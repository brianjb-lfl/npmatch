import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Switch, Redirect } from 'react-router-dom';
import UserPreview from '../user-preview/user-preview';

export class ExplorePage extends Component {

  render() {

    const redirect = this.props.user.id ? '' :
    <Switch><Redirect from='*' to='/' /></Switch>

    let previews;
    let title;

    if (this.props.match.url === '/organizations') {
      previews = Array.isArray(this.props.usersList) ?
        this.props.usersList.map((user, key) => {
        if (user.userType === 'organization') {
          return <UserPreview key={key} user={user}  showDetail={true} history={this.props.history}/> 
        } else {
          return null;
        }
      }) : null ;
      title = 'Explore Organizations' 

    } else {
      previews = Array.isArray(this.props.usersList) ?
        this.props.usersList.map((user, key) => {
        if (user.userType === 'individual') {
          return <UserPreview key={key} user={user} showDetail={true} history={this.props.history}/> 
        } else {
          return null;
        }
      }) : null ;
      title = 'Explore Contributors'
    }

    return (
      <main className='explorePage'>
        {redirect}
        <h2 className='sectionTitle'>{title}</h2>
        <div className='previewCardListContainer listOfAnchorTags'>
          {previews}
        </div>
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