import React from 'react';
import { shallow, mount } from 'enzyme';
import { Link } from 'react-router-dom';
import { MemoryRouter } from 'react-router-dom';

import { NavBarBottom } from './nav-bar-bottom';
import { mapStateToProps } from './nav-bar-bottom';

describe('Bottom Nav Bar component display functionality', () => {
  it('Smoke test - component should render', () => {
    shallow(<NavBarBottom
      match={{
        url: '/'
      }}
    />);
  });
  it('Should render the component with the correct links passed down as props on Landing Page', () => {
    const wrapper = shallow(<NavBarBottom
      display='landingPage'
      match={{
        url: '/'
      }}
    />);
    expect(wrapper.find('.leftBottomButton button').text()).toEqual('Sign In');
    expect(wrapper.find('.rightBottomButton button').text()).toEqual('Sign Up');
  });
  it('Should render the component with the correct links passed down as props on other pages', () => {
    const wrapper = shallow(<NavBarBottom
      display='explorePage'
      match={{
        url: '/organizations'
      }}
    />);
    expect(wrapper.find('.leftBottomButton button').text()).toEqual('Organizations');
    expect(wrapper.find('.rightBottomButton button').text()).toEqual('Contributors');
  });
  it('Should render the Home Button when the display is NOT landingPage or homePage', () => {
    const wrapper = shallow(<NavBarBottom
      display='explorePage'
      match={{
        url: '/contributors'
      }}
    />);
    expect(wrapper.find('.homeBottomButton').exists()).toEqual(true);
  });
  it('Should NOT render the Home Button when the display is homePage', () => {
    const wrapper = shallow(<NavBarBottom
      display='homePage'
      match={{
        url: '/'
      }}
    />);
    expect(wrapper.find('.homeBottomButton').exists()).toEqual(false);
  });
  it('Should NOT render the Home Button when the display is landingPage', () => {
    const wrapper = shallow(<NavBarBottom
      display='landingPage'
      match={{
        url: '/'
      }}
    />);
    expect(wrapper.find('.homeBottomButton').exists()).toEqual(false);
  });
  it('Should render the Home Button correctly', () => {
    const wrapper = shallow(<NavBarBottom
      display='explorePage'
      match={{
        url: '/organizations'
      }}
    />);
    expect(wrapper.find('.homeBottomButton button').text()).toEqual('Home');
  });
  it('Should map state to props', () => {
    const initialState = { display: { view: 'homePage' } };
    const expectedProps = { display: 'homePage' };
    const mockState = mapStateToProps(initialState);
    expect(mockState).toEqual(expectedProps);
  })
  it('Should dispatch actions when clicking Organizations', () => {
    const spy = jest.fn();
    const historySpy = jest.fn();
    const wrapper = mount(<MemoryRouter initialEntries={['/']} initialIndex={0}>
      <NavBarBottom
        display='homePage'
        dispatch={spy}
        user={{ authToken: 12345 }}
        match={{ url: '/' }}
        history={{ push: historySpy }}
      />
    </MemoryRouter>);
    expect(wrapper.find('.leftBottomButton').simulate('click'));
    expect(spy.mock.calls.length).toEqual(2);
    expect(historySpy.mock.calls.length).toEqual(1);
  });
  it('Should dispatch actions when clicking Contributors', () => {
    const spy = jest.fn();
    const historySpy = jest.fn();
    const wrapper = mount(<MemoryRouter initialEntries={['/']} initialIndex={0}>
      <NavBarBottom
        display='homePage'
        dispatch={spy}
        user={{ authToken: 12345 }}
        match={{ url: '/' }}
        history={{ push: historySpy }}
      />
    </MemoryRouter>);
    expect(wrapper.find('.rightBottomButton').simulate('click'));
    expect(spy.mock.calls.length).toEqual(2);
    expect(historySpy.mock.calls.length).toEqual(1);
  });
  it('Should dispatch actions when clicking Login', () => {
    const spy = jest.fn();
    const historySpy = jest.fn();
    const wrapper = mount(<MemoryRouter initialEntries={['/organizations']} initialIndex={0}>
      <NavBarBottom
        display='landingPage'
        dispatch={spy}
        user={{ authToken: 12345 }}
        match={{ url: '/' }}
        history={{ push: historySpy }}
      />
    </MemoryRouter>);
    expect(wrapper.find('.leftBottomButton').simulate('click'));
    expect(spy.mock.calls.length).toEqual(1);
    expect(historySpy.mock.calls.length).toEqual(1);
  });
  it('Should dispatch actions when clicking Sign Up', () => {
    const spy = jest.fn();
    const historySpy = jest.fn();
    const wrapper = mount(<MemoryRouter initialEntries={['/organizations']} initialIndex={0}>
      <NavBarBottom
        display='landingPage'
        dispatch={spy}
        user={{ authToken: 12345 }}
        match={{ url: '/' }}
        history={{ push: historySpy }}
      />
    </MemoryRouter>);
    expect(wrapper.find('.rightBottomButton').simulate('click'));
    expect(spy.mock.calls.length).toEqual(1);
    expect(historySpy.mock.calls.length).toEqual(1);
  });
});