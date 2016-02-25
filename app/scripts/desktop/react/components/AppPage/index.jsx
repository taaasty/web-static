import React, { Children, Component, PropTypes, cloneElement } from 'react';

import Auth from '../Auth';
import UserToolbarContainer from '../toolbars/UserToolbarContainer';
import ComposeToolbar from '../ComposeToolbar';
import BrowserSupportContainer from '../BrowserSupport/BrowserSupportContainer';

class AppPage extends Component {
  render() {
    const { CalendarActions, FeedEntriesActions, FlowActions, RelationshipActions,
            TlogActions, TlogEntriesActions, TlogEntryActions, appStats, calendar, children,
            currentUser, feedEntries, flow, tlog, tlogEntries, tlogEntry } = this.props;
    const childrenWithProps = Children.map(
      children,
      (child) => cloneElement(
        child,
        {
          CalendarActions,
          FeedEntriesActions,
          FlowActions,
          RelationshipActions,
          TlogActions,
          TlogEntriesActions,
          TlogEntryActions,
          appStats,
          calendar,
          currentUser,
          feedEntries,
          flow,
          tlog,
          tlogEntries,
          tlogEntry,
        }
      )
    );
    const isLogged = !!currentUser.data.id;

    return (
      <div className="page">
        {childrenWithProps}
        {!isLogged && <Auth fixed />}
        {isLogged && <ComposeToolbar tlog={tlog.data} user={currentUser.data} />}
        <UserToolbarContainer {...window.STATE_FROM_SERVER.userToolbar} />
        <BrowserSupportContainer />
      </div>
    );
  }
}

AppPage.propTypes = {
  CalendarActions: PropTypes.object.isRequired,
  FeedEntriesActions: PropTypes.object.isRequired,
  FlowActions: PropTypes.object.isRequired,
  RelationshipActions: PropTypes.object.isRequired,
  TlogActions: PropTypes.object.isRequired,
  TlogEntriesActions: PropTypes.object.isRequired,
  TlogEntryActions: PropTypes.object.isRequired,
  appStats: PropTypes.object.isRequired,
  calendar: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
  ]).isRequired,
  currentUser: PropTypes.object.isRequired,
  feedEntries: PropTypes.object.isRequired,
  flow: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  tlog: PropTypes.object.isRequired,
  tlogEntries: PropTypes.object.isRequired,
  tlogEntry: PropTypes.object.isRequired,
};

export default AppPage;
