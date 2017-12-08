import React from 'react';
import { shallow } from 'enzyme';

import ContributorPreview from './ContributorPreview';

describe('Contributor Preview component display functionality', () => {
  it('Smoke test - component should render', () => {
    shallow(<ContributorPreview />);
  });
  it('Should display the avatar, name, and bio', () => {
    const wrapper = shallow(<ContributorPreview logo="http://i0.kym-cdn.com/photos/images/original/000/692/145/49c.png" name="Ben Malin" description="I am a front-end developer."/>);
    expect(wrapper.containsAllMatchingElements([
      <img src="http://i0.kym-cdn.com/photos/images/original/000/692/145/49c.png"></img>,
      <h3>Ben Malin</h3>,
      <p>I am a front-end developer.</p>
    ])).toEqual(true);
  });
  it('Should display a different logo, name, and description', () => {
    const wrapper = shallow(<ContributorPreview logo="https://upload.wikimedia.org/wikipedia/commons/e/eb/Stephen_Hawking.StarChild.jpg" name="Stephen Hawking" description="I am a genius."/>);
    expect(wrapper.containsAllMatchingElements([
      <img src="https://upload.wikimedia.org/wikipedia/commons/e/eb/Stephen_Hawking.StarChild.jpg"></img>,
      <h3>Stephen Hawking</h3>,
      <p>I am a genius.</p>
    ])).toEqual(true);
  });
  it('Should display the correct information for each prop', () => {
    const wrapper = shallow(<ContributorPreview 
      logo="http://i0.kym-cdn.com/photos/images/original/000/692/145/49c.png"
      name="Ben Malin"
      description="I am a front-end developer."
    />);
    expect(wrapper.find('.name').text()).toEqual('Ben Malin');
    expect(wrapper.find('.description').text()).toEqual('I am a front-end developer.');
  });
});