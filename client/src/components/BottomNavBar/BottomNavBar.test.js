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
        <li></li>
        <li></li>
      </ul>
    )).toEqual(true);
  });
  // it('Should render two list items', () => {
  //   const wrapper = shallow(<BottomNavBar />);
  //   expect(wrapper.containsAllMatchingElements([
  //     <li></li>,
  //     <li></li>
  //   ])).toEqual(true);
  // });
});