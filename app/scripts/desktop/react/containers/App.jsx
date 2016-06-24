import React, { Component, PropTypes } from 'react';
import { applyMiddleware, createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import reducers from '../reducers';
import AppPageContainer from './AppPageContainer';

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware
)(createStore);

let store = void 0;

class App extends Component {
  componentWillMount() {
    store = createStoreWithMiddleware(combineReducers(reducers), window.STATE_FROM_SERVER);
  }
  render() {
    return (
      <Provider store={store}>
        <AppPageContainer>
          {this.props.children}
        </AppPageContainer>
      </Provider>
    );
  }
}

App.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
  ]),
};

export default App;
