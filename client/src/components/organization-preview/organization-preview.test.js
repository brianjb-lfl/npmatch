import React from 'react';
import { shallow } from 'enzyme';


import OrganizationPreview from './organization-preview';

describe('Organization Preview component display functionality', () => {
  const user = {
    logo: 'https://www.facebook.com/images/fb_icon_325x325.png',
    organization: 'Facebook',
    bio: 'We melt brains, one notification at a time.',
    id: 7
  }

  it('Smoke test - component should render', () => {
    shallow(<OrganizationPreview user={user} />);
  });
  it('Should display the avatar, name, and bio', () => {
    const wrapper = shallow(<OrganizationPreview user={user} />);
    expect(wrapper.find('img').prop('src')).toEqual('https://www.facebook.com/images/fb_icon_325x325.png');
    expect(wrapper.find('.organization').text()).toEqual('Facebook');
    expect(wrapper.find('.bio').text()).toEqual('We melt brains, one notification at a time.');
  });

  it('Should display a different logo, name, a bio with different props', () => {
    const user = {
      logo: 'https://upload.wikimedia.org/wikipedia/commons/e/eb/Stephen_Hawking.StarChild.jpg',
      organization: 'Twitter',
      bio: 'We melt brains, one tweet at a time.',
      id: 4
    }
    const wrapper = shallow(<OrganizationPreview user={user} />);
    expect(wrapper.find('img').prop('src')).toEqual('https://upload.wikimedia.org/wikipedia/commons/e/eb/Stephen_Hawking.StarChild.jpg');
    expect(wrapper.find('.organization').text()).toEqual('Twitter');
    expect(wrapper.find('.bio').text()).toEqual('We melt brains, one tweet at a time.');
  });
  it('Should dispatch an actions when the component is clicked', () => {
    const spy = jest.fn();
    const wrapper = shallow(<OrganizationPreview user={user} dispatch={spy} />);
    expect(wrapper.find('div').simulate('click'));
    expect(spy.mock.calls.length).toEqual(1);
  })
});