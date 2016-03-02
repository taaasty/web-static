/*eslint react/jsx-sort-props:0 */
import React from 'react';
import { browserHistory, IndexRoute, Router, Route, Redirect } from 'react-router';

import App from './containers/App';
//import AppRedirect from './AppRedirect';

import TlogPageRoot from './components/TlogPage/TlogPageRoot';
import TlogPage from './components/TlogPage';
import EntryPage from './components/EntryPage';
import FeedPage from './components/FeedPage';
import FlowsPage from './components/FlowsPage';

function AppRoot() {
  return (
    <Router history={browserHistory}>
      <Route path="/" component={App}>

        <Redirect from="~anonymous" to="live/anonymous" />
        <Route path="~:slug" component={TlogPageRoot}>
          <IndexRoute component={TlogPage} />
          <Route path="design_settings" component={TlogPage} />
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
      </Route>
    </Router>
  );
}

AppRoot.displayName = 'AppRoot';

export default AppRoot;
