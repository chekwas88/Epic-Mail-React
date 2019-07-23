import React from 'react';
import { shallow } from 'enzyme';
import { InputField } from '../../components/FormComponents';


describe('Input field component should be rendered', () => {
  const props = {
    required: 'true',
    fieldId: 'comment',
    type: 'text',
    name: 'field',
    inputChangeHandler: jest.fn(),
    placeHolder: 'field',
  };
  const textFieldComponent = shallow(<InputField {...props} />);

  it('should render a text field with the passed in prop', () => {
    expect(textFieldComponent.find('input').exists()).toBe(true);
  });
});
