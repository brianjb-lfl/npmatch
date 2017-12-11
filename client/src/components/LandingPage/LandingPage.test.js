import React from 'react';
import { shallow } from 'enzyme';

import LandingPage from './LandingPage';

describe('Landing Page component display functionality', () => {
  it('Smoke test - component should render', () => {
    shallow(<LandingPage />);
  });
});