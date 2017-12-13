import React from 'react';
import { shallow } from 'enzyme';

import {UserProfile} from './user-profile';
import {mapStateToProps} from './user-profile';

describe('Core display functionality of User Profile', () => {
  it('Smoke test - component should render', () => {
    shallow(< UserProfile />);
  });
  it('Should display basic user information- logo/avatar, name, location, description', () => {
    const wrapper = shallow(<UserProfile 
      logo="https://www.facebook.com/images/fb_icon_325x325.png" 
      name="Facebook" 
      locationCity="Menlo Park"
      locationState="CA"
      description="We melt brains, one notification at a time."
    />);
    expect(wrapper.containsAllMatchingElements([
      <img src="https://www.facebook.com/images/fb_icon_325x325.png"></img>,
      <h3>Facebook</h3>,
      <h4>Menlo Park, CA</h4>,
      <p>We melt brains, one notification at a time.</p>
    ])).toEqual(true);
  });
  it('Should display different user information based on props', () => {
    const wrapper = shallow(<UserProfile 
      logo="https://pbs.twimg.com/profile_images/875087697177567232/Qfy0kRIP_400x400.jpg" 
      name="Twitter" 
      locationCity="Menlo Park"
      locationState="CA"
      description="We melt brains, one tweet at a time."
    />);
    expect(wrapper.containsAllMatchingElements([
      <img src="https://pbs.twimg.com/profile_images/875087697177567232/Qfy0kRIP_400x400.jpg"></img>,
      <h3>Twitter</h3>,
      <h4>Menlo Park, CA</h4>,
      <p>We melt brains, one tweet at a time.</p>
    ])).toEqual(true);
  });
  it('Should map state to props', () => {
    const initialState = {display: {view: 'homePage'}};
    const expectedProps = {display: 'homePage'};
    const mockState = mapStateToProps(initialState);
    expect(mockState).toEqual(expectedProps);
  })
});