import React from 'react';
import { shallow } from 'enzyme';
import Spinner from '../../components/Spinner';

const props = {
  loadingText: 'modal',
};

describe('Spinner component should be rendered', () => {
  const spinnerComponent = shallow(<Spinner {...props} />);

  it('should contain a spinner class', () => {
    expect(spinnerComponent.find('div').hasClass('spinner'));
  });
  it('should have a span element', () => {
    expect(spinnerComponent.find('span').exists()).toBe(true);
  });
});
