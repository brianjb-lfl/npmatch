import React from 'react';
import { shallow } from 'enzyme';

import LoginPage from './login-in';

describe('Core display functionality of LoginPage', () => {
  it('Smoke test - component should render', () => {
    shallow(< LoginPage />);
  });
});