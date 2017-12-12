import React from 'react';
import { shallow } from 'enzyme';

import {ExplorePage} from './ExplorePage';
import {mapStateToProps} from './ExplorePage';

describe('Explore Page component display functionality', () => {
  it('Smoke test - component should render', () => {
    shallow(<ExplorePage />);
  });
  it('Should map state to props', () => {
    const initialState = {display: {view: 'homePage'}};
    const expectedProps = {display: 'homePage'};
    const mockState = mapStateToProps(initialState);
    expect(mockState).toEqual(expectedProps);
  })
});