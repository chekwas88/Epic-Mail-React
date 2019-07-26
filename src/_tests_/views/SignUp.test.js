import React from 'react';
import { mount } from 'enzyme';
import { RegisterComponent } from '../../components/Signup';

const props = {
  register: jest.fn(),
  errors: {},
  history: '',
  loader: () => {},
  loadingText: '',
  clearAuthErrors: () => {},
};
describe('test Sign up component', () => {
  const wrapper = mount(
    <RegisterComponent {...props} />
  );
  it('should ensure form element exists', () => {
    expect(wrapper.find('form').exists()).toBe(true);
  });
  it('should mock form submission', (done) => {
    const mockFn = jest.fn();
    const signupForm = wrapper.find('form.userform');
    signupForm.simulate('submit', { preventDefault: mockFn });
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(wrapper.props().register).toHaveBeenCalledTimes(1);
    done();
  });

  it('should mock onchange on input element', (done) => {
    const inputField = wrapper.find('InputField').at(0);
    inputField.simulate('change', {
      target: { name: 'firstName', value: 'chisom' }
    });
    expect(wrapper.state().firstName).toEqual('chisom');
    done();
  });
  it('should mock onchange on input element', (done) => {
    const inputField = wrapper.find('InputField').at(1);
    inputField.simulate('change', {
      target: { name: 'lastName', value: 'chekwas' }
    });
    expect(wrapper.state().lastName).toEqual('chekwas');
    done();
  });
  it('should mock onchange on input element', (done) => {
    const inputField = wrapper.find('InputField').at(2);
    inputField.simulate('change', {
      target: { name: 'email', value: 'chekwas@epicmail.com' }
    });
    expect(wrapper.state().email).toEqual('chekwas@epicmail.com');
    done();
  });
  it('should mock user onchange on input element', (done) => {
    const inputField = wrapper.find('InputField').at(3);
    inputField.simulate('change', {
      target: { name: 'password', value: 'password' }
    });
    expect(wrapper.state().password).toEqual('password');
    done();
  });
  it('should mock onchange on input element', (done) => {
    const inputField = wrapper.find('InputField').at(4);
    inputField.simulate('change', {
      target: { name: 'confirmPassword', value: 'password' }
    });
    expect(wrapper.state().confirmPassword).toEqual('password');
    done();
  });
});
