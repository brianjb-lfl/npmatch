import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionsDisplay from '../../actions/display';

import './landing-page.css'

import UserPreview from '../user-preview/user-preview';

export class LandingPage extends Component {
  componentDidMount() {
    this.props.dispatch(actionsDisplay.changeDisplay('landingPage'));
  }

  render() {
    let previews = Array.isArray(this.props.usersList) ?
      this.props.usersList.map((user, key) => {
        if (user.userType === 'organization') {
          return <UserPreview user={user} key={key} history={this.props.history} showDetail={false} />
        } else {
          return null;
        }
      }) : '';

    return (
      <div className='landingPage mainColumn'>
        <h2 className='sectionTitle'>CauseWay</h2>
        <div className='descriptionContainer'>
          <p>
            Welcome to CauseWay!
          </p>
          <p className='appDescription'>
            With this app, non-profit organizations can connect with volunteers and vice-versa.
          Organizations are able to post information about the causes they supporting and
          upcoming projects that they're looking for support on. Individuals who sign up, listed
          as "contributors" can post their own skills and apply to or volunteer for the projects
          that organizations are posting.
          </p>
          <p>Feel free to test out the app by signing in with the following:
          <ul className='testAccount'>
              <li>Username: johnsmith@test.com</li>
              <li>Password: password123</li>
            </ul>
          </p>
        </div>
        <div className='previewCardListContainer'>
          {previews}
        </div>
      </div>
    )
  }
}

export const mapStateToProps = state => ({
  usersList: state.usersList.main,
  display: state.display.view
})
export default connect(mapStateToProps)(LandingPage)