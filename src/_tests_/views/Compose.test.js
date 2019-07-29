import React from 'react';
import { mount } from 'enzyme';
import { ComposeComponent } from '../../Views/Compose';


const props = {
  closeModal: jest.fn(),
  sendMessage: jest.fn(),
  clearMessageErrors: jest.fn(),
  loader: jest.fn(),
  loadingText: 'loading',
  errors: {},
};

const wrapper = mount(
  <ComposeComponent {...props} />
);


describe('test compose component', () => {
  it('should ensure that Modal exists', () => {
    expect(wrapper.find('Modal').exists()).toBe(true);
    expect(wrapper.find('Modal').first('div').hasClass('compose-layout'));
  });

  it('should mock form submission', (done) => {
    const mockFn = jest.fn();
    const button = wrapper.find('button.compose-bttn');
    button.simulate('click', { preventDefault: mockFn });
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(wrapper.props().sendMessage).toHaveBeenCalledTimes(1);
    done();
  });

  it('should mock onChange on input element', (done) => {
    const div = wrapper.find('Modal');
    const inputField = div.find('InputField').at(0);
    inputField.find('input').simulate('change', { target: { name: 'recipient', value: 'marshall@epicmail.com' } });
    expect(wrapper.state().recipient).toEqual('marshall@epicmail.com');
    done();
  });
  it('should mock onChange on textarea element', (done) => {
    const inputField = wrapper.find('textarea');
    inputField.simulate('change', { target: { name: 'message', value: 'hola' } });
    expect(wrapper.state().message).toEqual('hola');
    done();
  });
});
