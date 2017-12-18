import React from 'react';
import { shallow } from 'enzyme';

import {ExplorePage} from './explore-page';
import {mapStateToProps} from './explore-page';
import { DetailedOrganizationPreview } from '../detailed-organization-preview/detailed-organization-preview';
import { DetailedContributorPreview } from '../detailed-contributor-preview/detailed-contributor-preview';

describe('Explore Page component display functionality', () => {
  const usersList = [{
    main: {
      id: 1,
    }
  }];
  it('Smoke test - component should render', () => {
    shallow(<ExplorePage usersList={usersList} />);
  });
  it('Should display organizations when display is for exploreOrganizations', () => {
    const wrapper = shallow(<ExplorePage display='exploreOrganizations' usersList={usersList} />)
    expect(wrapper.containsMatchingElement(
      <DetailedOrganizationPreview />
    ));
  });
  it('Should display contributors when display is for exploreContributors', () => {
    const wrapper = shallow(<ExplorePage display='exploreContributors' usersList={usersList} />)
    expect(wrapper.containsMatchingElement(
      <DetailedContributorPreview />
    ));
  });
  it('Should map state to props', () => {
    const initialState = {display: {view: 'homePage'}};
    const expectedProps = {display: 'homePage'};
    const mockState = mapStateToProps(initialState);
    expect(mockState).toEqual(expectedProps);
  });
});