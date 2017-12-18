import React from 'react';
import { shallow } from 'enzyme';

import { OpportunitiesPage } from './opportunities-page';
import { mapStateToProps } from './opportunities-page';
import { OrganizationPreview } from '../organization-preview/organization-preview';

describe('Home Page component display functionality', () => {
  const opportunitiesList = [{
    main: {
      id: 1,
    }
  }
  ];
  it('Smoke test - component should render', () => {
    shallow(<OpportunitiesPage opportunitiesList={opportunitiesList} />);
  });
  it('Should have an Add Opportunity button', () => {
    const wrapper = shallow(<OpportunitiesPage opportunitiesList={opportunitiesList} />);
    expect(wrapper.containsMatchingElement(
      <div>
        <button>Add Opportunity</button>
      </div>
    )).toEqual(true);
  });
  it('Should render an empty unordered list without opportunities', () => {
    const wrapper = shallow(<OpportunitiesPage />);
    expect(wrapper.containsMatchingElement(
      <li></li>
    )).toEqual(false);
  });
  it('Should display organizations', () => {
    const wrapper = shallow(<OpportunitiesPage opportunitiesList={opportunitiesList} />)
    expect(wrapper.containsMatchingElement(
      <li>
        <OpportunityPreview />
      </li>
    )).toEqual(true);
});
  // it('Should map state to props', () => {
  //   const initialState = { display: '' };
  //   const expectedProps = { display: '' };
  //   const mockState = mapStateToProps(initialState);
  //   expect(mockState).toEqual(expectedProps);
  // })
});