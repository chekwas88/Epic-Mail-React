import React from 'react';
import { shallow } from 'enzyme';
import UserAuth from '../../Views/UserAuth';

describe('UserAuth component should be rendered correctly', () => {
  const userAuthComponent = shallow(<UserAuth />);

  it('should contain a div with class of container', () => {
    expect(userAuthComponent.find('div.container').exists()).toBe(true);
  });
  it('should have an element nav', () => {
    expect(userAuthComponent.find('nav').exists()).toBe(true);
  });
});
