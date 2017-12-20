import React from 'react';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import { mapStateToProps } from './opportunity-preview';
import { OpportunityPreview } from './opportunity-preview';

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
  it.skip('Should dispatch an actions when the component is clicked', () => {
    const spy = jest.fn(async () => Promise.resolve({}));
    const historySpy = jest.fn();
    const wrapper = shallow(<MemoryRouter initialEntries={['/profiles/3']} initialIndex={0}>
      <OpportunityPreview
        opportunity={opportunity}
        dispatch={spy}
        user={{ authToken: 12345 }}
        match={{ url: '/profiles/3' }}
        history={{ push: historySpy }}
      />
    </MemoryRouter>);
    expect(wrapper.first().shallow().first().shallow().find('.editOpportunityButton').simulate('click'));
    expect(spy.mock.calls.length).toEqual(1);
  });
  it('Should map state to props', () => {
    const initialState = {
      display: 'homePage',
      user: { id: 1 }
    };
    const expectedProps = { 
      display: 'homePage',
      user: { id: 1 }
    };
    const mockState = mapStateToProps(initialState);
    expect(mockState).toEqual(expectedProps);
  });
});