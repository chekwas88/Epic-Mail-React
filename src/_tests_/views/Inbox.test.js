import React from 'react';
import { mount } from 'enzyme';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxPromise from 'redux-promise';
import { BrowserRouter as Router } from 'react-router-dom';
import reducers from '../../redux/reducers/rootReducer';
import Inbox from '../../Views/Inbox';

const store = createStore(reducers, applyMiddleware(ReduxPromise));
const props = {
  getReceivedMessages: () => {},
  loader: () => {},
  receivedMessages: [],
  isLoggedIn: true,
  loadingText: 'loading',
  errors: {},
};
describe('test Login component', () => {
  const InboxComponent = mount(
    <Provider store={store}>
      <Router>
        <Inbox {...props} />
      </Router>
    </Provider>
  );
  it('should ensure that Inbox renders correctly', () => {
    expect(InboxComponent.find('Sidebar').exists()).toBe(true);
    expect(InboxComponent.find('Header').exists()).toBe(true);
    expect(InboxComponent.find('Footer').exists()).toBe(true);
  });
  it('should call the instance functions if component renders correctly', () => {
    InboxComponent.setState({ isOpen: true });
  });
});
