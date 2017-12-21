import React from 'react';
import { shallow } from 'enzyme';

import { OpportunitiesPage } from './opportunities-page';
import { mapStateToProps } from './opportunities-page';
import { OpportunityPreview } from '../organization-preview/organization-preview';

describe('Opportunities Page component display functionality', () => {
  const opportunitiesList = {
    main: [{
      id: 1
    }]
  };
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
    const opportunitiesList = {
      main: [{
        id: 1
      }]
    };
    const wrapper = shallow(<OpportunitiesPage opportunitiesList={opportunitiesList} />);
    expect(wrapper.containsMatchingElement(
      <li></li>
    )).toEqual(false);
  });
  it('Should map state to props', () => {
    const initialState = {
      user: {
        id: 1
      },
      display: {
        view: 'opportunitiesPage'
      },
      opportunitiesList: {
        id: 1
      }
    };
    const expectedProps = {
      user: {
        id: 1
      },
      display: 'opportunitiesPage',
      opportunitiesList: {
        id: 1
      }
    };
    const mockState = mapStateToProps(initialState);
    expect(mockState).toEqual(expectedProps);
  })
});