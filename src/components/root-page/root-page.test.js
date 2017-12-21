import React from 'react';
import { shallow } from 'enzyme';

import { mapStateToProps } from './root-page';
import { RootPage } from './root-page';
import { HomePage } from '../home-page/home-page';
import { LandingPage } from '../landing-page/landing-page';

describe('Root Page component display functionality', () => {
  const user = {
    id: 1
  };
  it('Smoke test - component should render', () => {
    shallow(<RootPage user={user} />);
  })
  it.skip('Should render the HomePage when there is a user id', () => {
    const wrapper = shallow(<RootPage user={user} />);
    expect(wrapper.containsMatchingElement(
      <HomePage />
    )).toEqual(true);
  });
  it.skip('Should render the LandingPage when there is no user id', () => {
    const user = {
      id: null
    };
    const wrapper = shallow(<RootPage user={user} />);
    expect(wrapper.containsMatchingElement(
      <LandingPage />
    )).toEqual(true);
  });
  it('Should map state to props', () => {
    const initialState = {
      user: null,
      userViewed: null,
      usersList: {
        main: {
          id: 1
        }
      },
      opportunity: null,
      opportunitiesList: null,
      display: 'homePage'
    };
    const expectedProps = { 
      user: null,
      userViewed: null,
      usersList: { id: 1 },
      opportunity: null,
      opportunitiesList: null,
      display: 'homePage'
    };
    const mockState = mapStateToProps(initialState);
    expect(mockState).toEqual(expectedProps);
  })
});