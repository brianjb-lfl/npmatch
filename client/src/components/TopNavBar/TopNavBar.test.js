import React from 'react';
import { shallow } from 'enzyme';

import TopNavBar from './topNavBar';

describe('Top Nav Bar component display functionality', () => {
  it('Smoke test - component should render', () => {
    shallow(<TopNavBar />);
  });
  it('Should render an unordered list with three list items, each with sub-elements', () => {
    const wrapper = shallow(<TopNavBar />);
    expect(wrapper.containsMatchingElement(
      <ul>
        <li>
          <i></i>
        </li>
        <li>
          <form>
            <label></label>
            <input></input>
            <button>Search</button>
          </form>
        </li>
        <li>
          <i></i>
        </li>
      </ul>
    )).toEqual(true);
  });
  it('Should render a messages icon, search bar, and settings icon', () => {
    const wrapper = shallow(<TopNavBar />);
    expect(wrapper.find('.leftButton i').prop('className')).toEqual('fa fa-envelope-o');
    expect(wrapper.find('.searchBar form').prop('className')).toEqual('search');
    expect(wrapper.find('.rightButton i').prop('className')).toEqual('fa fa-bars');
    expect(wrapper.find('.searchBar').text()).toEqual('Search');
  });
});