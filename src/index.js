import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { createMiddleware } from '@youzan/shuai';

import states from './states';
import { createEffectInit } from './effects';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

function configureStore(state) {
  const middlewares = [
    createMiddleware()
  ];
  return createStore(
    state,
    applyMiddleware(...middlewares)
  );
}

const store = configureStore(states);

createEffectInit();

class View extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
}
ReactDOM.render(<View />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
