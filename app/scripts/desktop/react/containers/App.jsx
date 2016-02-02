import React, { Component } from 'react';
import { applyMiddleware, createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import reducers from '../reducers';

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware
)(createStore);

let store = void 0;

class App extends Component {
  componentWillMount() {
    window.SPA = true;
    store = createStoreWithMiddleware(combineReducers(reducers), window.STATE_FROM_SERVER);
  }
  render() {
    return (
      <Provider store={store}>
        {this.props.children}
      </Provider>
    );
  }
}

export default App;
