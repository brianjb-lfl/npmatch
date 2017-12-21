import React from 'react';
import { shallow } from 'enzyme';

import { mapStateToProps } from './top-nav-bar';
import { TopNavBar } from './top-nav-bar';

describe('Top Nav Bar component display functionality', () => {
  const user = {
    id: 1
  };
  it('Smoke test - component should render', () => {
    shallow(<TopNavBar user={user} />);
  });
  it('Should render a messages icon, opportunities icon, search bar, profile icon and settings icon when there is a user', () => {
    const wrapper = shallow(<TopNavBar user={user} />);
    expect(wrapper.find('.inboxButton i').prop('className')).toEqual('fa fa-envelope-o');
    expect(wrapper.find('.opportunitiesButton i').prop('className')).toEqual('fa fa-briefcase');
    expect(wrapper.find('.searchBar i').prop('className')).toEqual('fa fa-search');
    expect(wrapper.find('.editProfileButton i').prop('className')).toEqual('fa fa-user-circle-o');
    expect(wrapper.find('.settingsButton i').prop('className')).toEqual('fa fa-bars');
  });
  it('Should only render the search bar when there is no user', () => {
    const user = {
      id: null
    };
    const wrapper = shallow(<TopNavBar user={user} />);
    expect(wrapper.find('.inboxButton').exists()).toEqual(false);
    expect(wrapper.find('.opportunitiesButton').exists()).toEqual(false);
    expect(wrapper.find('.searchBar').exists()).toEqual(true);
    expect(wrapper.find('.searchBar i').prop('className')).toEqual('fa fa-search');
    expect(wrapper.find('.editProfileButton').exists()).toEqual(false);
    expect(wrapper.find('.settingsButton').exists()).toEqual(false);
  })
  it('Should map state to props', () => {
    const initialState = {
      user: {
          id: 1
      },
      display: {
        view: 'landingPage'
      },
    };
    const expectedProps = {
      user: {
        id: 1
      },
      display: 'landingPage'
    };
    const mockState = mapStateToProps(initialState);
    expect(mockState).toEqual(expectedProps);
  })
});