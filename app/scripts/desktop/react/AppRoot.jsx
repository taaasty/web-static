/*eslint react/jsx-sort-props:0 */
import React, { Component } from 'react';
import { applyMiddleware, createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import reducers from './reducers';
import { browserHistory, IndexRoute, Router, Route, Redirect } from 'react-router';

import AppPageEmpty from './components/AppPage/Empty'; // for non-spa components with toolbars
import AppPage from './components/AppPage';
import TlogPageRoot from './components/TlogPage/TlogPageRoot';
import TlogPage from './components/TlogPage';
import EntryPage from './components/EntryPage';
import FeedPage from './components/FeedPage';
import FlowsPage from './components/FlowsPage';
import PeoplePage from './components/PeoplePage';
import EditorPage from './components/EditorPage';

import { feedStatusConnect } from './services/FeedStatusService';

import PopupActions from './actions/popup';

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware
)(createStore);
let store = void 0;

class AppRoot extends Component {
  componentWillMount() {
    window.SPA = true;
    store = createStoreWithMiddleware(combineReducers(reducers), window.STATE_FROM_SERVER);
    feedStatusConnect(store.getState().currentUser.data, store);
  }
  render() {
    return (
      <Provider store={store}>
        <Router history={browserHistory}>
          <Route path="/account/:id/recover/:secret" component={AppPageEmpty} />
          <Route path="/orders/:id/:result" component={AppPageEmpty} />
          <Route path="/" component={AppPage}>
            <Redirect from="~anonymous" to="live/anonymous" />
            <Route path="~:slug" component={TlogPageRoot}>
              <IndexRoute component={TlogPage} />
              <Route path="edit/:editId" component={EditorPage} />
              <Route path="new" component={EditorPage} />
              <Route path="anonymous/new" component={EditorPage} />
              <Route
                  path="design_settings"
                  component={TlogPage}
                  onEnter={PopupActions.showDesignSettings}
                  onLeave={PopupActions.closeDesignSettings}
              />
              <Route path="settings" component={TlogPage} />
              <Route path="privates" component={TlogPage} />
              <Route path="favorites" component={TlogPage} />
              <Route path=":year/:month/:day" component={TlogPage} />
              <Route path=":entrySlug" component={EntryPage} />
              <Route path="/anonymous/:anonymousEntrySlug" component={EntryPage} />
            </Route>
            <Redirect from="@:slug" to="~:slug" />
            <Redirect from="u/:slug" to="~:slug" />

            <Redirect from="anonymous" to="live/anonymous" />
            <Redirect from="live/media" to="media" />
            <Route path="live/:section" component={FeedPage} />
            <Route path="live" component={FeedPage} />
            <Route path="friends" component={FeedPage} />
            <Route path="friends/media" component={FeedPage} />
            <Route path="best" component={FeedPage} />
            <Route path="media" component={FeedPage} />

            <Route path="flows" component={FlowsPage} />

            <Route path="people" component={PeoplePage} />
            <Route path="people/:sort" component={PeoplePage} />
          </Route>
        </Router>
      </Provider>
    );
  }
}

AppRoot.displayName = 'AppRoot';

export default AppRoot;
