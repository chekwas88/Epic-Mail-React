/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ReduxPromise from 'redux-promise';
import reducers from './redux/reducers/rootReducer';
import Landing from './Views/Landing';
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

    </Router>
  </Provider>

);

export default App;
