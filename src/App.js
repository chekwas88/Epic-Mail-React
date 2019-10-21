/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ReduxPromise from 'redux-promise';
import reducers from './redux/reducers/rootReducer';
import Landing from './Views/Landing';
import ConnectedInbox from './Views/Inbox';
import ConnectedSentbox from './Views/Sent';
import ConnectedSingleMessage from './Views/SingleMessage';
import Modal from './components/Modal';
import './assets/css/style.css';

const store = createStore(reducers, applyMiddleware(ReduxPromise));

/**
 * @method App
 * @description Main app component
 * @returns {undefined}
 */
const App = () => (
  <Provider store={store}>
    <Router>
      <Route exact path="/" component={Landing} />
      <Route exact path="/inbox" component={ConnectedInbox} />
      <Route exact path="/sent" component={ConnectedSentbox} />
      <Route exact path="/modal" component={Modal} />
      <Route path="/message/:messageId" component={ConnectedSingleMessage} />
    </Router>
  </Provider>

);

export default App;
