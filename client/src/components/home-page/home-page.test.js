import React from 'react';
import { shallow } from 'enzyme';

import {HomePage} from './home-page';
import {mapStateToProps} from './home-page';

describe('Home Page component display functionality', () => {
  it('Smoke test - component should render', () => {
    shallow(<HomePage />);
  });
  it('Should map state to props', () => {
    const initialState = {display: {view: 'homePage'}};
    const expectedProps = {display: 'homePage'};
    const mockState = mapStateToProps(initialState);
    expect(mockState).toEqual(expectedProps);
  })
});