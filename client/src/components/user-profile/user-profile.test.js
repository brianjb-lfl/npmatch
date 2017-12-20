import React from 'react';
import { shallow } from 'enzyme';

import { UserProfile } from './user-profile';
import { mapStateToProps } from './user-profile';
import { OpportunityPreview } from '../opportunity-preview/opportunity-preview';

describe('Core display functionality of User Profile', () => {
  const user = {
    id: 1,
    logo: 'http://www.google.com/',
    firstName: null,
    lastName: null,
    username: null,
    organization: 'TARDIS',
    locationCity: 'Providence',
    locationState: 'RI',
    locationCountry: 'USA',
    bio: 'Travels through time and space.',
    availability: 'Everyday',
    links: ['http://www.google.com', 'http://www.bing.com'],
    causes: ['time', 'space'],
    skills: ['time travel', 'saving people'],
    opportunities: [
      {
        title: 'Opportunity'
      }
    ]
  };
  it('Smoke test - component should render', () => {
    shallow(< UserProfile user={user} />);
  });
  it('Should display basic user information from props', () => {
    const wrapper = shallow(<UserProfile user={user} />);
    expect(wrapper.find('userProfile img').prop('src')).toEqual('http://www.google.com/');
    expect(wrapper.find('.name').text()).toEqual('TARDIS');
    expect(wrapper.find('.location').text()).toEqual('Providence, RI, USA');
    expect(wrapper.find('.bio').text()).toEqual('Travels through time and space.');
    expect(wrapper.find('.links').text()).toEqual(`http://www.google.com, http://www.bing.com`);
    expect(wrapper.find('.causes').text()).toEqual('time, space');
    expect(wrapper.find('.skills').text()).toEqual('time travel, saving people');
  });
  it('Should not display any opportunity previews if none exist', () => {
    const user = {
      id: 1,
      logo: 'http://www.google.com/',
      firstName: null,
      lastName: null,
      username: null,
      organization: 'TARDIS',
      locationCity: 'Providence',
      locationState: 'RI',
      locationCountry: 'USA',
      bio: 'Travels through time and space.',
      availability: 'Everyday',
      links: ['http://www.google.com', 'http://www.bing.com'],
      causes: ['time', 'space'],
      skills: ['time travel', 'saving people'],
      opportunities: null
    };
    const wrapper = shallow(<UserProfile user={user} />);
    expect(wrapper.find('.opportunities').containsMatchingElement(
      <OpportunityPreview />
    )).toEqual(false);
  });
  it('Should map state to props', () => {
    const initialState = { display: 'homePage' };
    const expectedProps = { display: 'homePage' };
    const mockState = mapStateToProps(initialState);
    expect(mockState).toEqual(expectedProps);
  })
});