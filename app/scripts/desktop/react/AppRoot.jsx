/*global gon */
/*eslint react/jsx-sort-props:0, react/jsx-max-props-per-line:0 */
import React, { Component, PropTypes } from 'react';
import { applyMiddleware, compose, createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import apiMiddleware from './middleware/api';
import normalizeMiddleware from './middleware/normalize';
import beepMiddleware from './middleware/beep';
import reducers from './reducers';
import { browserHistory, IndexRoute, Router, Route, Redirect } from 'react-router';
import { camelizeKeys } from 'humps';
import { pusherSubscribe } from './messaging/actions/PusherActions';

import AppPageEmpty from './components/AppPage/Empty'; // for non-spa components with toolbars
import AppPage from './components/AppPage';
import TlogPageRoot from './components/TlogPage/TlogPageRoot';
import TlogPage from './components/TlogPage';
import EntryPage from './components/EntryPage';
import FeedPage from './components/FeedPage';
import FlowsPage from './components/FlowsPage';
import PeoplePage from './components/PeoplePage';
import EditorPage from './components/EditorPage';
import TagsPage from './components/TagsPage';
import TermsPage from './components/TermsPage';
import ContactsPage from './components/ContactsPage';
import PricesPage from './components/PricesPage';
import RefsPage from './components/RefsPage';
import ActivitiesPage from './components/ActivitiesPage';

import {
  initCurrentUser,
  initTlog,
  initTlogEntry,
  initFlow,
} from './actions/InitActions';
import {
  initAppStats,
} from './actions/AppStatsActions';
import {
  initTlogEntries,
} from './actions/TlogEntriesActions';
import {
  initFlows,
} from './actions/FlowsActions';

import { feedStatusConnect } from './services/FeedStatusService';

const createStoreWithMiddleware = compose(
  applyMiddleware(
    thunkMiddleware,
    apiMiddleware,
    normalizeMiddleware,
    beepMiddleware
  ), window.devToolsExtension ? window.devToolsExtension() : (f) => f)(createStore);
let store = void 0;

let firstHit = true;

function handleRouteUpdate() {
  const { pathname } = this.state.location;

  if (!firstHit) {
    if (window.ga) {
      window.ga('set', 'page', pathname);
      window.ga('send', 'pageview');
    }
  } else {
    firstHit = false;
  }
}

class AppRoot extends Component {
  componentWillMount() {
    const {
      appStats,
//      currentUser,
      flow,
      flows,
      tlog,
      tlogEntries,
      tlogEntry,
      userToolbar,
//      location,
//      params,
    } = this.props;

    store = createStoreWithMiddleware(combineReducers(reducers));

    if (typeof gon === 'object' && gon.user) {
      const user = camelizeKeys(gon.user);

      store.dispatch(initCurrentUser(user));
      store.dispatch(pusherSubscribe(user));
      store.dispatch(initTlog(user));
    }

    (appStats && store.dispatch(initAppStats(appStats)));
    (tlog && store.dispatch(initTlog(tlog)));
    (tlogEntry && store.dispatch(initTlogEntry(tlogEntry)));
    (flow && store.dispatch(initFlow(flow)));
// TODO: get data from props
//    (tlogEntries && store.dispatch(initTlogEntries(tlogEntries, this.props)));
//    (flows && store.dispatch(initFlows(flows, location)));

    feedStatusConnect(store.getState().currentUser.data, store);
  }
  render() {
    return (
      <Provider store={store}>
        <Router history={browserHistory} onUpdate={handleRouteUpdate}>
          <Route path="/account/:id/recover/:secret" component={AppPageEmpty} />
          <Route path="/orders/:id/:result" component={AppPageEmpty} />
          <Route path="/refs/:token" component={RefsPage} />
          <Route path="/" component={AppPage}>
            <Route path="contacts" component={ContactsPage} />
            <Route path="terms" component={TermsPage} />
            <Route path="prices" component={PricesPage} />
            <Route path="tags/:tags" component={TagsPage} />
            <Route path="~:slug/tags/:tags" component={TagsPage} />
            <Redirect from="~anonymous" to="live/anonymous" />
            <Route path="activities" component={ActivitiesPage} />
            <Route path="~:slug" component={TlogPageRoot}>
              <IndexRoute component={TlogPage} />
              <Route path="edit/:editId" component={EditorPage} />
              <Route path="new" component={EditorPage} />
              <Route path="anonymous/new" isAnonymousTlog component={EditorPage} />
              <Route path="design_settings" designSettings component={TlogPage} />
              <Route path="settings" settings component={TlogPage} />
              <Route path="privates" component={TlogPage} />
              <Route path="favorites" component={TlogPage} />
              <Route path="profile" profile component={TlogPage} />
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

AppRoot.propTypes = {
  appStats: PropTypes.object,
  currentUser: PropTypes.object,
  flow: PropTypes.object,
  flows: PropTypes.object,
  people: PropTypes.object,
  tlog: PropTypes.object,
  tlogEntries: PropTypes.object,
  tlogEntry: PropTypes.object,
  userToolbar: PropTypes.object,
};

export default AppRoot;
