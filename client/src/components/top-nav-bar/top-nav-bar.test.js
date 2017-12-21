import React from 'react';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

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
  it.skip('Should dispatch actions when clicking the opportunities button', () => {
    const spy = jest.fn(async () => Promise.resolve({}));
    const historySpy = jest.fn();
    const wrapper = shallow(<MemoryRouter initialEntries={['/']} initialIndex={0}>
      <TopNavBar
        display='homePage'
        dispatch={spy}
        user={{ authToken: 12345, id: 1 }}
        match={{ url: '/' }}
        history={{ push: historySpy }}
      />
    </MemoryRouter>);
    expect(wrapper.first().shallow().first().shallow().find('.opportunitiesButton i').simulate('click'));
    expect(spy.mock.calls.length).toEqual(1);
    // expect(historySpy.mock.calls.length).toEqual(1);
  });
  it('Should dispatch actions when clicking the edit profile button', () => {
    const spy = jest.fn(async () => Promise.resolve({}));
    const historySpy = jest.fn();
    const wrapper = shallow(<MemoryRouter initialEntries={['/']} initialIndex={0}>
      <TopNavBar
        display='homePage'
        dispatch={spy}
        user={{ authToken: 12345, id: 1 }}
        match={{ url: '/' }}
        history={{ push: historySpy }}
      />
    </MemoryRouter>);
    expect(wrapper.first().shallow().first().shallow().find('.editProfileButton i').simulate('click'));
    expect(spy.mock.calls.length).toEqual(1);
    expect(historySpy.mock.calls.length).toEqual(1);
  });
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