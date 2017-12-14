import React from 'react';
import { shallow } from 'enzyme';


import ContributorPreview from './contributor-preview';

describe('Contributor Preview component display functionality', () => {
  const user = {
    logo: 'http://i0.kym-cdn.com/photos/images/original/000/692/145/49c.png',
    name: 'Ben Malin',
    bio: 'I am a front-end developer.',
    id: 3
  }

  it('Smoke test - component should render', () => {
    shallow(<ContributorPreview user={user}/>);
  });
  it('Should display the avatar, name, and bio', () => {
    const wrapper = shallow(<ContributorPreview user={user} />);
    expect(wrapper.find('img').prop('src')).toEqual('http://i0.kym-cdn.com/photos/images/original/000/692/145/49c.png');
    expect(wrapper.find('.name').text()).toEqual('Ben Malin');
    expect(wrapper.find('.bio').text()).toEqual('I am a front-end developer.');
  });
  
  it('Should display a different logo, name, and description', () => {
    const user = {
      logo: 'https://upload.wikimedia.org/wikipedia/commons/e/eb/Stephen_Hawking.StarChild.jpg',
      name: 'Stephen Hawking',
      bio: 'I am a genius.',
      id: 4
    }
    const wrapper = shallow(<ContributorPreview user={user} />);
    expect(wrapper.find('img').prop('src')).toEqual('https://upload.wikimedia.org/wikipedia/commons/e/eb/Stephen_Hawking.StarChild.jpg');
    expect(wrapper.find('.name').text()).toEqual('Stephen Hawking');
    expect(wrapper.find('.bio').text()).toEqual('I am a genius.');
  });
  it('Should dispatch an actions when the component is clicked', () => {
    const spy = jest.fn();
    const wrapper = shallow(<ContributorPreview user={user} dispatch={spy} />);
    expect(wrapper.find('div').simulate('click'));
    expect(spy.mock.calls.length).toEqual(1);
  })
});