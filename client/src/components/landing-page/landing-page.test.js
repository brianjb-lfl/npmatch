import React from 'react';
import { shallow } from 'enzyme';

import LandingPage from './landing-page';

describe('Landing Page component display functionality', () => {
  it('Smoke test - component should render', () => {
    shallow(<LandingPage />);
  });
});