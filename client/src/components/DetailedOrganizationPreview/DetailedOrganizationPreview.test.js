import React from 'react';
import { shallow } from 'enzyme';

import DetailedOrganizationPreview from './DetailedOrganizationPreview';

describe('Detailed Organization Preview component display functionality', () => {
  it('Smoke test - component should render', () => {
    shallow(<DetailedOrganizationPreview />);
  });
  it('Should use the props for logo, name, and description', () => {
    const wrapper = shallow(<DetailedOrganizationPreview 
      logo="https://www.facebook.com/images/fb_icon_325x325.png"
      name="Facebook"
      description="We melt brains, one notification at a time."
    />);
    expect(wrapper.containsAllMatchingElements([
      <img src="https://www.facebook.com/images/fb_icon_325x325.png"></img>,
      <h3>Facebook</h3>,
      <p>We melt brains, one notification at a time.</p>
    ])).toEqual(true);
  });
  it('Should display a different logo, name, a description with different props', () => {
    const wrapper = shallow(<DetailedOrganizationPreview 
      logo="https://pbs.twimg.com/profile_images/875087697177567232/Qfy0kRIP_400x400.jpg"
      name="Twitter"
      description="We melt brains, one tweet at a time."
    />);
    expect(wrapper.containsAllMatchingElements([
      <img src="https://pbs.twimg.com/profile_images/875087697177567232/Qfy0kRIP_400x400.jpg"></img>,
      <h3>Twitter</h3>,
      <p>We melt brains, one tweet at a time.</p>
    ])).toEqual(true);
  });
  it('Should receive the correct props causes, skills sought, upcoming projects', () => {
    const fetchRequest = {
      causes: ["Human rights", "Homelessness"],
      skillsSought: ["Front-end web development", "Cooking"],
      upcomingProjects: ["Homeless Shelter Website Production", "Sunday cook-off for the needy"]
    };
    const fetchedCauses = fetchRequest.causes.join(', ');
    // console.log(fetchedCauses);
    const fetchedSkillsSought = fetchRequest.skillsSought.join(', ');
    // console.log(fetchedSkillsSought);
    const fetchedUpcomingProjects = fetchRequest.upcomingProjects.join(', ');
    // console.log(fetchedUpcomingProjects);
    const wrapper = shallow(<DetailedOrganizationPreview 
      causes={fetchedCauses}
      skillsSought={fetchedSkillsSought}
      upcomingProjects={fetchedUpcomingProjects}
    />);
    console.log(wrapper.html());
    expect(wrapper.prop('causes')).toEqual('Human rights, Homelessness');
    expect(wrapper.prop('skillsSought')).toEqual('Front-end web development, Cooking');
    expect(wrapper.prop('upcomingProjects')).toEqual('Homeless Shelter Website Production, Sunday cook-off for the needy');
  });

});