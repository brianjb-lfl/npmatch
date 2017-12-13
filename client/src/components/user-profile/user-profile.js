import React, { Component } from 'react';
import { connect } from 'react-redux';

import OpportunityPreview from '../opportunity-preview/opportunity-preview';

export class UserProfile extends Component {

  render() {
    let opportunityPreviews = this.props.opportunities.map((opp, key) => (
      <OpportunityPreview opportunity={opp} key={key} />
    )
    );

    return (
      <div>
        <div>
          <img src={this.props.logo}></img>
          <h3>{this.props.name}</h3>
          <h4>{this.props.locationCity} {this.props.locationState}</h4>
          <p>{this.props.description}</p>
        </div>
        {opportunityPreviews};
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  userViewed: state.userViewed,
  display: state.display
})
export default connect(mapStateToProps)(UserProfile);