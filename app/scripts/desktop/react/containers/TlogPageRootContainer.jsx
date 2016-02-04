import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TlogPageRoot from '../components/TlogPageRoot';

import * as CalendarActions from '../actions/CalendarActions';
import * as TlogActions from '../actions/TlogActions';
import * as TlogEntriesActions from '../actions/TlogEntriesActions';
import * as TlogEntryActions from '../actions/TlogEntryActions';
import * as RelationshipActions from '../actions/RelationshipActions';

class TlogPageRootContainer extends Component {
  render() {
    return <TlogPageRoot {...this.props} />;
  }
}

export default connect(
  (state) => ({
    currentUserId: state.currentUser.data.id,
    isLogged: !!state.currentUser.data.id,
    currentUser: state.currentUser,
    tlog: state.tlog,
    tlogEntries: state.tlogEntries,
    tlogEntry: state.tlogEntry,
    calendar: state.calendar,
  }),
  (dispatch) => ({
    CalendarActions: bindActionCreators(CalendarActions, dispatch),
    RelationshipActions: bindActionCreators(RelationshipActions, dispatch),
    TlogActions: bindActionCreators(TlogActions, dispatch),
    TlogEntriesActions: bindActionCreators(TlogEntriesActions, dispatch),
    TlogEntryActions: bindActionCreators(TlogEntryActions, dispatch),
  })
)(TlogPageRootContainer);
