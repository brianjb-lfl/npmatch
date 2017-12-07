import React from 'react';
import { shallow } from 'enzyme';

import UserProfile from './UserProfile';

describe('Core display functionality of User Profile', () => {
  it('Smoke test - component should render', () => {
    shallow(< UserProfile />);
  });
})