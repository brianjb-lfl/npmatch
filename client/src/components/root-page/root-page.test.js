import React from 'react';
import { shallow } from 'enzyme';

import { mapStateToProps } from './root-page';
import { RootPage } from './root-page';

describe.skip('Root Page component display functionality', () => {
  const user = {
    id: 1
  }
  it('Smoke test - component should render', () => {
    shallow(<RootPage />);
  })
});