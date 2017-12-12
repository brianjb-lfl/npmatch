import React from 'react';
import { shallow } from 'enzyme';

import RegisterPage from './RegisterPage';

describe('Core display functionality of RegisterPage', () => {
  it('Smoke test - component should render', () => {
    shallow(<RegisterPage />);
  });
});