import React from 'react';
import { shallow } from 'enzyme';
import Sidebar from '../../components/Sidebar';

const props = {
  displayModal: () => {},

};

describe('Modal component should be rendered', () => {
  const sidebarComponent = shallow(<Sidebar {...props} />);

  it('should have a class of side-nav', () => {
    expect(sidebarComponent.find('div').first().hasClass('side-nav'));
  });
  it('should contain a nav element', () => {
    expect(sidebarComponent.find('nav').exists()).toBe(true);
  });
  it('should have a ul element', () => {
    expect(sidebarComponent.find('ul').exists()).toBe(true);
  });
});
