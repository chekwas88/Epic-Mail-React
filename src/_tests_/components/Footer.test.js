import React from 'react';
import { shallow } from 'enzyme';
import Footer from '../../components/Footer';

describe('Footer component should be rendered', () => {
  const footerComponent = shallow(<Footer />);

  it('should contain a footer element', () => {
    expect(footerComponent.find('footer').exists()).toBe(true);
  });
  it('should have a class of f-style', () => {
    expect(footerComponent.find('footer').hasClass('f-style'));
  });
});
