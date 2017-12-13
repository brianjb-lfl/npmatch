import React from 'react';
import { shallow } from 'enzyme';

import SignInModal from './settings-page';

describe('Core display functionality of SettingsPage', () => {
  it('Smoke test - component should render', () => {
    shallow(<SettingsPage />);
  });
});