import React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'react-router-dom';

import {BottomNavBar} from './BottomNavBar';
import {mapStateToProps} from './BottomNavBar';

describe('Bottom Nav Bar component display functionality', () => {
  it('Smoke test - component should render', () => {
    shallow(<BottomNavBar />);
  });
  it('Should render the component with the correct links passed down as props on Landing Page', () => {
    const wrapper = shallow(<BottomNavBar 
      display='landingPage'
    />);
    expect(wrapper.find('.leftBottomButton button').text()).toEqual('Sign In');
    expect(wrapper.find('.rightBottomButton button').text()).toEqual('Sign Up');
  });
  it('Should render the component with the correct links passed down as props on other pages', () => {
    const wrapper = shallow(<BottomNavBar 
      display='explorePage'
    />);
    expect(wrapper.find('.leftBottomButton button').text()).toEqual('Organizations');
    expect(wrapper.find('.rightBottomButton button').text()).toEqual('Contributors');
  });
  it('Should render the Home Button when the display is NOT landingPage or homePage', () => {
    const wrapper = shallow(<BottomNavBar 
      display='explorePage'
    />);
    expect(wrapper.find('.homeBottomButton').exists()).toEqual(true);
  });
  it('Should NOT render the Home Button when the display is homePage', () => {
    const wrapper = shallow(<BottomNavBar 
      display='homePage'
    />);
    expect(wrapper.find('.homeBottomButton').exists()).toEqual(false);
  });
  it('Should NOT render the Home Button when the display is landingPage', () => {
    const wrapper = shallow(<BottomNavBar 
      display='landingPage'
    />);
    expect(wrapper.find('.homeBottomButton').exists()).toEqual(false);
  });
  it('Should render the Home Button correctly', () => {
    const wrapper = shallow(<BottomNavBar 
      display='explorePage'
    />);
    expect(wrapper.find('.homeBottomButton button').text()).toEqual('Home');
  });
  it('Should map state to props', () => {
    const initialState = {display: {view: 'homePage'}};
    const expectedProps = {display: 'homePage'};
    const mockState = mapStateToProps(initialState);
    expect(mockState).toEqual(expectedProps);
  })
});