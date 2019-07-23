import React from 'react';
import { mount } from 'enzyme';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxPromise from 'redux-promise';
import { BrowserRouter as Router } from 'react-router-dom';
import reducers from '../../redux/reducers/rootReducer';
import Compose from '../../Views/Compose';

const store = createStore(reducers, applyMiddleware(ReduxPromise));
const props = {
  closeModal: () => {},
  sendMessage: () => {},
  clearMessageErrors: () => {},
  loader: () => {},
  loadingText: 'loading',
  errors: {},
};
describe('test Login component', () => {
  const composeComponent = mount(
    <Provider store={store}>
      <Router>
        <Compose {...props} />
      </Router>
    </Provider>
  );
  it('should ensure that Modal exists', () => {
    expect(composeComponent.find('Modal').exists()).toBe(true);
    expect(composeComponent.find('Modal').first('div').hasClass('compose-layout'));
  });

  it('should mock form submission', async () => {
    const mockFn = jest.fn();
    const button = composeComponent.find('button.compose-bttn');
    button.simulate('click', { preventDefault: mockFn });
  });

  it('should mock user input', async () => {
    const mockFn = jest.fn();
    const inputField = composeComponent.find('InputField').at(0);
    inputField.find('input').simulate('change', { preventDefault: mockFn });
  });
  it('should mock user input', async () => {
    const mockFn = jest.fn();
    const inputField = composeComponent.find('InputField').at(1);
    inputField.find('input').simulate('change', { preventDefault: mockFn });
  });
});
