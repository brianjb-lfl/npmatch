import React from 'react';
import { shallow } from 'enzyme';

import { OpportunityPreview } from './opportunity-preview';

describe('Opportunity Preview component display functionality', () => {
  const opportunity = {
    title: 'Facebook',
    requiredSkills: ['Fake news, Making people dumb and lifeless'],
    timeframe: ['Time'],
    description: ['Melting brains']
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
    const spy = jest.fn();
    const wrapper = shallow(<OpportunityPreview opportunity={opportunity} dispatch={spy} />);
    expect(wrapper.find('button').simulate('click'));
    expect(spy.mock.calls.length).toEqual(1);
  })
});