import React from 'react';
import { shallow } from 'enzyme';

import UserProfile from './UserProfile';

describe('Core display functionality of User Profile', () => {
  it('Smoke test - component should render', () => {
    shallow(< UserProfile />);
  });
  it('Should display basic user information- logo/avatar, name, location, description', () => {
    const wrapper = shallow(<UserProfile />);
    expect(wrapper.containsAllMatchingElements([
      <img src="https://www.facebook.com/images/fb_icon_325x325.png"></img>,
      <h3>Facebook</h3>,
      <h4>Menlo Park, CA</h4>,
      <p>We melt brains, one notification at a time.</p>
    ])).toEqual(true);
  });
});