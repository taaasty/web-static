import React from 'react';
import { browserHistory, IndexRoute, Router, Route, Redirect } from 'react-router';

import App from './containers/App';
import TlogPageRootContainer from './containers/TlogPageRootContainer';

import TlogPage from './components/TlogPage';
import EntryPage from './components/EntryPage';

const AppRouting = function() {
  return (
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <Route path="~:slug" component={TlogPageRootContainer}>
          <IndexRoute component={TlogPage} />
          <Route path="privates" component={TlogPage} />
          <Route path="favorites" component={TlogPage} />
          <Route path=":year/:month/:day" name="daylog" component={TlogPage} />
          <Route path=":entrySlug" name="tlogEntry" component={EntryPage} />
        </Route>
        <Redirect from="@:slug" to="~:slug" />
        <Redirect from="u/:slug" to="~:slug" />

        <Route path="anonymous/:anonymousEntrySlug" component={TlogPageRootContainer}>
          <IndexRoute component={EntryPage} />
        </Route>
      </Route>
    </Router>
  );
}

export default AppRouting;
