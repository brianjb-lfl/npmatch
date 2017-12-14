import React from 'react';
import { shallow } from 'enzyme';

import { DetailedOrganizationPreview } from './detailed-organization-preview';

describe('Detailed Organization Preview component display functionality', () => {
  const user = {
    logo: 'http://i0.kym-cdn.com/photos/images/original/000/692/145/49c.png',
    name: 'Facebook',
    bio: 'I melt brains, one notification at a time.',
    causes: ['Fake news', 'Making people dumb and lifeless'],
    skillsSought: ['Web development', 'Inception'],
    upcomingProjects: ['San Francisco Starving Developer March', 'Chili Cookoff'],
    id: 3
  }

  it('Smoke test - component should render', () => {
    shallow(<DetailedOrganizationPreview user={user} />);
  });
  it('Should use the props for logo, name, and description', () => {
    const wrapper = shallow(<DetailedOrganizationPreview user={user} />);
    expect(wrapper.find('img').prop('src')).toEqual('http://i0.kym-cdn.com/photos/images/original/000/692/145/49c.png');
    expect(wrapper.find('.name').text()).toEqual('Facebook');
    expect(wrapper.find('.bio').text()).toEqual('I melt brains, one notification at a time.');
    expect(wrapper.find('.causes').text()).toEqual('Fake news, Making people dumb and lifeless');
    expect(wrapper.find('.skillsSought').text()).toEqual('Web development, Inception');
    expect(wrapper.find('.upcomingProjects').text()).toEqual('San Francisco Starving Developer March, Chili Cookoff');
  });
  it('Should display a different logo, name, a description with different props', () => {
    const user = {
      logo: 'https://upload.wikimedia.org/wikipedia/commons/e/eb/Stephen_Hawking.StarChild.jpg',
      name: 'Twitter',
      bio: 'I melt brains, one tweet at a time.',
      causes: ['Fake news', 'Politics'],
      skillsSought: ['Web development', 'Graphic design'],
      upcomingProjects: ['Trump Ban-athon', 'March of the Twits'],
      id: 4
    }
    const wrapper = shallow(<DetailedOrganizationPreview user={user} />);
    expect(wrapper.find('img').prop('src')).toEqual('https://upload.wikimedia.org/wikipedia/commons/e/eb/Stephen_Hawking.StarChild.jpg');
    expect(wrapper.find('h3').text()).toEqual('Twitter');
    expect(wrapper.find('.bio').text()).toEqual('I melt brains, one tweet at a time.');
    expect(wrapper.find('.causes').text()).toEqual('Fake news, Politics');
    expect(wrapper.find('.skillsSought').text()).toEqual('Web development, Graphic design');
    expect(wrapper.find('.upcomingProjects').text()).toEqual('Trump Ban-athon, March of the Twits');
  });
  it('Should dispatch an actions when the component is clicked', () => {
    const spy = jest.fn();
    const wrapper = shallow(<DetailedOrganizationPreview user={user} dispatch={spy} />);
    expect(wrapper.find('div').simulate('click'));
    expect(spy.mock.calls.length).toEqual(1);
  })
});