import React from 'react';
import { shallow } from 'enzyme';

import { OpportunityPreview } from './opportunity-preview';
import * as actionsOpportunity from '../../actions/opportunity';
import * as actionsDisplay from '../../actions/display';

import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
const middlewares = [ thunk ];
const mockStore = configureStore(middlewares);
// console.log('mockStore1',mockStore());

// Initialize mockstore with empty state
const initialState = {}
const store = mockStore(initialState)

describe('Opportunity Preview component display functionality', () => {
  const opportunity = {
    id: 1,
    title: 'Facebook',
    requiredSkills: ['Fake news, Making people dumb and lifeless'],
    timeframe: 'Time',
    description: 'Melting brains'
  }

  it('Smoke test - component should render', () => {
    shallow(<OpportunityPreview opportunity={opportunity} />);
  });
  it('Should use the props for title, skills, timeframe, and description', () => {
    const wrapper = shallow(<OpportunityPreview opportunity={opportunity} />);
    expect(wrapper.find('.opportunityTitle').text()).toEqual('Facebook');
    expect(wrapper.find('.requiredSkills').text()).toEqual('Fake news, Making people dumb and lifeless');
    expect(wrapper.find('.timeframe').text()).toEqual('Time');
    expect(wrapper.find('.description').text()).toEqual('Melting brains');
  });
  it('Should display a different title, skills, timeframe, and description with different props', () => {
    const opportunity = {
      title: 'Twitter',
      requiredSkills: 'Short thoughts',
      timeframe: 'Time2',
      description: 'Shrinking consciousness'
    }
    const wrapper = shallow(<OpportunityPreview opportunity={opportunity} />);
    expect(wrapper.find('.opportunityTitle').text()).toEqual('Twitter');
    expect(wrapper.find('.requiredSkills').text()).toEqual('Short thoughts');
    expect(wrapper.find('.timeframe').text()).toEqual('Time2');
    expect(wrapper.find('.description').text()).toEqual('Shrinking consciousness');
  });
  it('Should dispatch an actions when the component is clicked', () => {

    const mockResponse = (status, statusText, response) => {
      return new window.Response(response, {
        status: status,
        statusText: statusText,
        headers: {
          'Content-type': 'application/json'
        }
      });
    };

    const expectedResponse = 'whatever you want back';

    window.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve(mockResponse(200, null, JSON.stringify(expectedResponse))));

    const spy = jest.fn(()=>Promis.resolve());
    const historySpy = jest.fn();
    const user = { authToken: '000' };
    const wrapper = shallow(<OpportunityPreview
      opportunity={opportunity}
      dispatch={store.dispatch}
      user={user}
      match={{url: '/profiles/3'}}
      history={{push: historySpy}}
    />);
    const theButton = wrapper.first().shallow().first().shallow().find('.buttonClass');
    console.log('theButton',JSON.stringify(theButton));
    return new Promise((resolve, reject) => {
      console.log('inside promise')
      return theButton.simulate('click')
    }) 
    .then(()=>{
      const expectedActions = store.getActions();
      console.log('expectedActions',expectedActions)
      expect(expectedActions.length).toBe(3);
      expect(expectedActions).toContainEqual(
        {type: actionsDisplay.CHANGE_DISPLAY, view: 'loading'},
        {type: actionsDisplay.CHANGE_DISPLAY, view: 'editOpportunity'},
        {type: actionsOpportunity.LOAD_OPPORTUNITY, expectedResponse }
      )
    });
  });
});