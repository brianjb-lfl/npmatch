import React from 'react';
import { shallow } from 'enzyme';

import BottomNavBar from './BottomNavBar';

describe('Bottom Nav Bar component display functionality', () => {
  it('Smoke test - component should render', () => {
    shallow(<BottomNavBar />);
  });
  it('Should render an unordered list with two list items', () => {
    const wrapper = shallow(<BottomNavBar />);
    expect(wrapper.containsMatchingElement(
      <ul>
        <li><a></a></li>
        <li><a></a></li>
      </ul>
    )).toEqual(true);
  });
  it('Should render the component with the correct links passed down as props', () => {
    const wrapper = shallow(<BottomNavBar 
      leftLink='https://www.signin.project'
      leftLabel='Sign In'
      leftAltText='Sign In button'
      rightLink='https://www.signup.project'
      rightLabel='Sign Up'
      rightAltText='Sign Up button'
    />);
    expect(wrapper.find('.leftButton a').prop('href')).toEqual('https://www.signin.project');
    expect(wrapper.find('.leftButton a').prop('alt')).toEqual('Sign In button');
    expect(wrapper.find('.leftButton a').text()).toEqual('Sign In');
    expect(wrapper.find('.rightButton a').prop('href')).toEqual('https://www.signup.project');
    expect(wrapper.find('.rightButton a').prop('alt')).toEqual('Sign Up button');
    expect(wrapper.find('.rightButton a').text()).toEqual('Sign Up');
  });
});