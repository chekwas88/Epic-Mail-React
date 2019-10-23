import React from 'react';
import { shallow } from 'enzyme';
import { UserAuthComponent } from '../../Views/UserAuth';

describe('UserAuth component should be rendered correctly', () => {
  const userAuth = shallow(<UserAuthComponent />);

  it('should contain a div with class of container', () => {
    expect(userAuth.find('div.container').exists()).toBe(true);
  });
  it('should have an element nav', () => {
    expect(userAuth.find('nav').exists()).toBe(true);
  });
});
