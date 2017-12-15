import React, { Component } from 'react';
import { connect } from 'react-redux';

import './user-profile.css';
import OpportunityPreview from '../opportunity-preview/opportunity-preview';

export class UserProfile extends Component {

  render() {
    let opportunityPreviews = typeof this.props.opportunities !== 'object' ? '' : this.props.opportunities.map((opp, key) => (
      <OpportunityPreview opportunity={opp} key={key} />
    )
    );

    return (
      <main>
        <div className='userProfile'>
          <img src={this.props.logo} alt={`${this.props.name} logo`}></img>
          <h3>{this.props.name}NAME NAME</h3>
          <h4>{this.props.locationCity} CITY STATE {this.props.locationState}</h4>
          <p>{this.props.description}</p>
        </div>
        {opportunityPreviews}
      </main>
    );
  }
}

export const mapStateToProps = state => ({
  userViewed: state.userViewed,
  display: state.display
})
export default connect(mapStateToProps)(UserProfile);