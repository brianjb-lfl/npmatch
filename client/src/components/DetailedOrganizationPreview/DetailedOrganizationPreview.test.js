import React from 'react';
import { shallow } from 'enzyme';

import DetailedOrganizationPreview from './DetailedOrganizationPreview';

describe('Detailed Organization Preview component display functionality', () => {
  it('Smome test - component should render', () => {
    shallow(<DetailedOrganizationPreview />);
  });
})