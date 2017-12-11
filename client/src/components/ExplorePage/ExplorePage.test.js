import React from 'react';
import { shallow } from 'enzyme';

import ExplorePage from './ExplorePage';

describe('Explore Page component display functionality', () => {
  it('Smoke test - component should render', () => {
    shallow(<ExplorePage />);
  });
});