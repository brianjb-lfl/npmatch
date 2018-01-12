import React from 'react';
import { shallow } from 'enzyme';

import { HomePage } from './home-page';
import { mapStateToProps } from './home-page';
import { UserPreview } from '../user-preview/user-preview';

describe('Home Page component display functionality', () => {
  const usersList = [{
    main: {
      id: 1,
    }
  }];
  it('Smoke test - component should render', () => {
    shallow(<HomePage />);
  });
  it('Should display organizations', () => {
    const wrapper = shallow(<HomePage usersList={usersList} />)
    expect(wrapper.containsMatchingElement(
      <UserPreview />
    ));
  });
  it('Should map state to props', () => {
    const initialState = {
      user: null,
      userViewed: null,
      usersList: {
        main: {
          id: 1
        }
      },
      opportunity: null,
      opportunitiesList: null,
      display: {
        view: 'homePage'
      },
    };
    const expectedProps = { 
      user: null,
      userViewed: null,
      usersList: { id: 1 },
      opportunity: null,
      opportunitiesList: null,
      display: 'homePage'
    };
    const mockState = mapStateToProps(initialState);
    expect(mockState).toEqual(expectedProps);
  })
});