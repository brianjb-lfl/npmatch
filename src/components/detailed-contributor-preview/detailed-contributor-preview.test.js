import React from 'react';
import { shallow } from 'enzyme';

import { DetailedContributorPreview } from './detailed-contributor-preview';

describe('Detailed Contributor Preview component display functionality', () => {
  const user = {
    logo: 'http://i0.kym-cdn.com/photos/images/original/000/692/145/49c.png',
    name: 'Ben Malin',
    bio: 'I am a front-end developer.',
    causes: ['Homelessness', 'Stray animals'],
    skills: ['Web development', 'Cooking'],
    availability: 'Monday-Friday - 6-7PM EST',
    id: 3
  }

  it('Smoke test - component should render', () => {
    shallow(<DetailedContributorPreview user={user} />);
  });
  it('Should use the props for logo, name, and description', () => {
    const wrapper = shallow(<DetailedContributorPreview user={user} />);
    expect(wrapper.find('img').prop('src')).toEqual('http://i0.kym-cdn.com/photos/images/original/000/692/145/49c.png');
    expect(wrapper.find('.name').text()).toEqual('Ben Malin');
    expect(wrapper.find('.bio').text()).toEqual('I am a front-end developer.');
    // expect(wrapper.find('.causes').text()).toEqual('Homelessness, Stray animals');
    // expect(wrapper.find('.skills').text()).toEqual('Web development, Cooking');
    expect(wrapper.find('.availability').text()).toEqual('Monday-Friday - 6-7PM EST');
  });
  it('Should display a different logo, name, a description with different props', () => {
    const user = {
      logo: 'https://upload.wikimedia.org/wikipedia/commons/e/eb/Stephen_Hawking.StarChild.jpg',
      name: 'Stephen Hawking',
      bio: 'I am a genius.',
      causes: ['Cosmology', 'Artificial intelligence'],
      skills: ['Science', 'Math', 'You name it'],
      availability: 'Book him while he\'s still around',
      id: 4
    }
    const wrapper = shallow(<DetailedContributorPreview user={user} />);
    expect(wrapper.find('img').prop('src')).toEqual('https://upload.wikimedia.org/wikipedia/commons/e/eb/Stephen_Hawking.StarChild.jpg');
    expect(wrapper.find('h3').text()).toEqual('Stephen Hawking');
    expect(wrapper.find('.bio').text()).toEqual('I am a genius.');
    // expect(wrapper.find('.causes').text()).toEqual('Cosmology, Artificial intelligence');
    // expect(wrapper.find('.skills').text()).toEqual('Science, Math, You name it');
    expect(wrapper.find('.availability').text()).toEqual('Book him while he\'s still around');
  });
  it('Should dispatch an actions when the component is clicked', () => {
    const spy = jest.fn();
    const wrapper = shallow(<DetailedContributorPreview user={user} dispatch={spy} />);
    expect(wrapper.find('div').simulate('click'));
    expect(spy.mock.calls.length).toEqual(1);
  })
});