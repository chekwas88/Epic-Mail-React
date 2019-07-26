import React from 'react';
import { mount } from 'enzyme';
import { LoginComponent } from '../../components/Signin';

const props = {
  loginUser: jest.fn(),
  loader: jest.fn(),
  clearAuthErrors: jest.fn(),
  history: '/',
  loadingText: 'loading',
  errors: {}
};
describe('test Login component', () => {
  const wrapper = mount(
    <LoginComponent {...props} />
  );
  it('should ensure that form element exists', () => {
    expect(wrapper.find('form').exists()).toBe(true);
  });

  it('should mock form submission', (done) => {
    const mockFn = jest.fn();
    const loginForm = wrapper.find('form.userform');
    loginForm.simulate('submit', { preventDefault: mockFn });
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(wrapper.props().loginUser).toHaveBeenCalledTimes(1);
    done();
  });

  it('should mock onchange on input element', (done) => {
    const inputField = wrapper.find('InputField').at(0);
    inputField.simulate('change', {
      target: { name: 'email', value: 'marshall@epicmail.com' }
    });
    expect(wrapper.state().email).toEqual('marshall@epicmail.com');
    done();
  });
  it('should mock onchange on input element', (done) => {
    const inputField = wrapper.find('InputField').at(1);
    inputField.find('input').simulate('change', {
      target: { name: 'password', value: 'password' }
    });
    expect(wrapper.state().password).toEqual('password');
    done();
  });
});
