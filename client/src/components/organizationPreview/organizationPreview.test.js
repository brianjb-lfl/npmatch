import React from 'react';
import { shallow } from 'enzyme';

import OrganizationPreview from './OrganizationPreview';

describe('Organization Preview component functionality', () => {
  it('Smoke test - component should render', () => {
    shallow(<OrganizationPreview />);
  })
  it('Should display the logo, name, and description', () => {
    const wrapper = shallow(<OrganizationPreview logo="https://www.facebook.com/images/fb_icon_325x325.png" name="Facebook" description="We melt brains, one notification at a time."/>);
    expect(wrapper.containsAllMatchingElements([
      <img src="https://www.facebook.com/images/fb_icon_325x325.png"></img>,
      <h3>Facebook</h3>,
      <p>We melt brains, one notification at a time.</p>
    ])).toEqual(true);
  });
  it('Should display a different logo, name, and description', () => {
    const wrapper = shallow(<OrganizationPreview logo="https://pbs.twimg.com/profile_images/875087697177567232/Qfy0kRIP_400x400.jpg" name="Twitter" description="We melt brains, one tweet at a time."/>);
    expect(wrapper.containsAllMatchingElements([
      <img src="https://pbs.twimg.com/profile_images/875087697177567232/Qfy0kRIP_400x400.jpg"></img>,
      <h3>Twitter</h3>,
      <p>We melt brains, one tweet at a time.</p>
    ])).toEqual(true);
  });
})