import React from 'react';
import { mount } from 'enzyme';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxPromise from 'redux-promise';
import { BrowserRouter as Router } from 'react-router-dom';
import reducers from '../../redux/reducers/rootReducer';
import Sent from '../../Views/Sent';

const store = createStore(reducers, applyMiddleware(ReduxPromise));
const props = {
  getSentMessages: () => {},
  loader: () => {},
  sentMessages: [],
  isLoggedIn: true,
  loadingText: 'loading',
  clearMessageErrors: () => {},
  errors: {},
};
describe('test Login component', () => {
  const SentComponent = mount(
    <Provider store={store}>
      <Router>
        <Sent {...props} />
      </Router>
    </Provider>
  );
  it('should ensure that Inbox renders correctly', () => {
    expect(SentComponent.find('Sidebar').exists()).toBe(true);
    expect(SentComponent.find('Header').exists()).toBe(true);
    expect(SentComponent.find('Footer').exists()).toBe(true);
  });
  it('should call the instance functions if component renders correctly', () => {
    SentComponent.setState({ isOpen: true });
  });
});
