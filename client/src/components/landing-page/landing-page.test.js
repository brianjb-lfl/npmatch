import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import { mapStateToProps } from './landing-page';
import { LandingPage } from './landing-page';
import { OrganizationPreview } from '../organization-preview/organization-preview';

const mockStore = configureStore();

describe('Landing Page component display functionality', () => {
  const spy = jest.fn();
  const usersList = [{
    main: {
      id: 1,
    }
  }];
  it('Smoke test - component should render', () => {
    shallow(<LandingPage dispatch={spy} />);
  });
  it('Should display organizations', () => {
    const wrapper = shallow(<LandingPage dispatch={spy} usersList={usersList} />)
    expect(wrapper.containsMatchingElement(
      <OrganizationPreview />
    ));
  });
  // it('Should map state to props', () => {
  //   const initialState = { display: 'landingPage', usersList: usersList };
  //   const expectedProps = { display: 'landingPage', usersList: [{
  //     main: {
  //       id: 1,
  //     }
  //   }]};
  //   const mockState = mapStateToProps(initialState);
  //   expect(mockState).toEqual(expectedProps);
  // })
});