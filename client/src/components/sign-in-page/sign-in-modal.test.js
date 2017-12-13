import React from 'react';
import { shallow } from 'enzyme';

import SignInModal from './SignInModal';

describe('Core display functionality of SignInModal', () => {
  it('Smoke test - component should render', () => {
    shallow(< SignInModal />);
  });
});