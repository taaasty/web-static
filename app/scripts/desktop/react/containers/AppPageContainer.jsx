import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as AppStatsActions from '../actions/AppStatsActions';
import * as CalendarActions from '../actions/CalendarActions';
import * as FeedEntriesActions from '../actions/FeedEntriesActions';
import * as FeedStatusActions from '../actions/FeedStatusActions';
import * as FlowActions from '../actions/FlowActions';
import * as RelationshipActions from '../actions/RelationshipActions';
import * as TlogActions from '../actions/TlogActions';
import * as TlogEntriesActions from '../actions/TlogEntriesActions';
import * as TlogEntryActions from '../actions/TlogEntryActions';

import AppPage from '../components/AppPage';

class AppPageContainer extends Component {
  render() {
    return <AppPage {...this.props} />;
  }
}

export default connect(
  (state) => state,
  (dispatch) => ({
    AppStatsActions: bindActionCreators(AppStatsActions, dispatch),
    CalendarActions: bindActionCreators(CalendarActions, dispatch),
    FeedEntriesActions: bindActionCreators(FeedEntriesActions, dispatch),
    FeedStatusActions: bindActionCreators(FeedStatusActions, dispatch),
    FlowActions: bindActionCreators(FlowActions, dispatch),
    RelationshipActions: bindActionCreators(RelationshipActions, dispatch),
    TlogActions: bindActionCreators(TlogActions, dispatch),
    TlogEntriesActions: bindActionCreators(TlogEntriesActions, dispatch),
    TlogEntryActions: bindActionCreators(TlogEntryActions, dispatch),
  })
)(AppPageContainer);
