import React from 'react';
import { shallow } from 'enzyme';

import { HomePage } from './home-page';
import { mapStateToProps } from './home-page';
import { OrganizationPreview } from '../organization-preview/organization-preview';

describe('Home Page component display functionality', () => {
  const usersList = [{
    id: 1,
  }];
  it('Smoke test - component should render', () => {
    shallow(<HomePage />);
  });
  it('Should display organizations', () => {
    const wrapper = shallow(<HomePage usersList={usersList} />)
    expect(wrapper.containsMatchingElement(
      <OrganizationPreview />
    ));
  });
  it('Should map state to props', () => {
    const initialState = { display: 'homePage' };
    const expectedProps = { display: 'homePage' };
    const mockState = mapStateToProps(initialState);
    expect(mockState).toEqual(expectedProps);
  })
});