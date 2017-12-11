import React from 'react';
import { shallow } from 'enzyme';

import HomePage from './HomePage';

describe('Home Page component display functionality', () => {
  it('Smoke test - component should render', () => {
    shallow(<HomePage />);
  });
});