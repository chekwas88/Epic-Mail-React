import React from 'react';
import { mount, shallow } from 'enzyme';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxPromise from 'redux-promise';
import { BrowserRouter as Router } from 'react-router-dom';
import reducers from '../../redux/reducers/rootReducer';
import SignUp, { RegisterComponent } from '../../components/Signup';

const store = createStore(reducers, applyMiddleware(ReduxPromise));
const props = {
  register: () => {},
  errors: {},
  history: '',
  loader: () => {},
  loadingText: 'loading',
  clearAuthErrors: () => {},
};
describe('test Sign up component', () => {
  const signUpComponent = mount(
    <Provider store={store}>
      <Router>
        <SignUp {...props} />
      </Router>
    </Provider>
  );
  it('should ensure form element exists', () => {
    expect(signUpComponent.find('form').exists()).toBe(true);
  });

  it('should mock onSubmit function', async () => {
    const mockFn = jest.fn();
    const signUpForm = signUpComponent.find('form.userform');
    signUpForm.simulate('submit', { preventDefault: mockFn });
  });

  it('should mock user input', async () => {
    const mockFn = jest.fn();
    const inputField = signUpComponent.find('InputField').at(0);
    inputField.find('input').simulate('change', { preventDefault: mockFn });
  });
});

describe('test Sign Up component with Errors', () => {
  const mockErrorMsg = { error: 'Incorrect username' };
  const signUpComponent = shallow(
    <RegisterComponent errors={{ error: mockErrorMsg }} clearAuthErrors={props.clearAuthErrors} />
  );
  it('should display error tag', () => {
    expect(signUpComponent.find('p.error').exists()).toBe(true);
  });
});
