import React from 'react';
import { mount } from 'enzyme';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxPromise from 'redux-promise';
import { BrowserRouter as Router } from 'react-router-dom';
import reducers from '../../redux/reducers/rootReducer';
import Login from '../../components/Signin';

const store = createStore(reducers, applyMiddleware(ReduxPromise));
const props = {
  register: () => {},
  errors: {},
  history: '',
  loader: () => {},
  loadingText: 'loading',
  clearAuthErrors: () => {},
};
describe('test Login component', () => {
  const loginComponent = mount(
    <Provider store={store}>
      <Router>
        <Login {...props} />
      </Router>
    </Provider>
  );
  it('should ensure that header exists', () => {
    expect(loginComponent.find('form').exists()).toBe(true);
  });

  it('should mock form submission', async () => {
    const mockFn = jest.fn();
    const loginForm = loginComponent.find('form.userform');
    loginForm.simulate('submit', { preventDefault: mockFn });
  });

  it('should mock user input', async () => {
    const mockFn = jest.fn();
    const inputField = loginComponent.find('InputField').at(0);
    inputField.find('input').simulate('change', { preventDefault: mockFn });
  });
});
