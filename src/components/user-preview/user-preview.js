import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionsUser from '../../actions/user';
import * as actionsDisplay from '../../actions/display';
import * as helpers from '../../actions/helpers';
import UserFollow from '../user-follow/user-follow';

export class UserPreview extends Component {
  handleClick(id) {
    console.log('id clicked',id)
    this.props.dispatch(actionsUser.fetchUser(
      id,
      this.props.userInState.authToken,
      'userViewed',
      'userViewed'
    ))
    .then(()=>{
      this.props.history.push(`/profiles/${this.props.user.id}`)
      this.props.dispatch(actionsDisplay.setOpportunity(null));
    })
  }

  render() {

    const displayName = helpers.formatUserName(this.props.user);

    const bio = this.props.showDetail ? <p className='previewCardText previewBio hoverBlack'>{this.props.user.bio}</p> : null ;
    
    const formattedLocation = helpers.formattedLocation(this.props.user);
    const location = this.props.showDetail ? <p className='previewCardText previewLocation hoverBlack'>{formattedLocation}</p> : null ;

    const userFollow = (this.props.userInState.id && this.props.userInState.id !== this.props.user.id) ?
       <UserFollow id={this.props.user.id} /> : '' ;

    const causes = helpers.formatCausesIcon(this.props.user.causes, this.props.user);
    const causesList = this.props.showDetail ? <ul className='causesList'>{causes}</ul> : <div></div> ;

    const logo = this.props.user.logo ? this.props.user.logo : 'https://mave.me/img/projects/full_placeholder.png' ;
    
    const overflowClass = 'overflowHidden'; // future potential to focus previews

    return (
      <div className='previewCard' >
        <div className={`previewCardInner ${overflowClass}`}onClick={() => this.handleClick(this.props.user.id)}>
          <img className='previewCardLogo' src={logo} alt={`${displayName} logo`}></img>        
          <div className='previewCardTextContainer'>
            <h3 className='previewCardTitle hoverBlack'>{displayName}</h3>
            {bio}
            {location}
          </div>
        </div>
        <div className='previewBottomBar'>
          {causesList}
          {userFollow}
        </div>
      </div>
    )
  }
}
export const mapStateToProps = state => ({
  userInState: state.user,
})
export default connect(mapStateToProps)(UserPreview);