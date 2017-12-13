import React from 'react';
import { shallow } from 'enzyme';

import OpportunityPreview from './opportunity-preview';

describe('Opportunity Preview component display functionality', () => {
  it('Smoke test - component should render', () => {
    shallow(<OpportunityPreview />);
  });
});