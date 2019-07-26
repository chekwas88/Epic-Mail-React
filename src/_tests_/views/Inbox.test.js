import React from 'react';
import { mount } from 'enzyme';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxPromise from 'redux-promise';
import { BrowserRouter as Router } from 'react-router-dom';
import reducers from '../../redux/reducers/rootReducer';
import { InboxComponent } from '../../Views/Inbox';

const store = createStore(reducers, applyMiddleware(ReduxPromise));
const props = {
  getReceivedMessages: jest.fn(),
  loader: jest.fn(),
  receivedMessages: [],
  isLoggedIn: true,
  loadingText: 'loading',
  errors: {},
};
describe('test Login component', () => {
  const wrapper = mount(
    <Provider store={store}>
      <Router>
        <InboxComponent {...props} />
      </Router>
    </Provider>
  );

  it('should ensure that Inbox renders correctly', () => {
    expect(wrapper.find('Sidebar').exists()).toBe(true);
    expect(wrapper.find('Header').exists()).toBe(true);
    expect(wrapper.find('Footer').exists()).toBe(true);
  });
});
