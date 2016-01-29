import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TlogPageRoot from '../components/TlogPageRoot';

import * as TlogEntriesActions from '../actions/TlogEntriesActions';
import * as TlogEntryActions from '../actions/TlogEntryActions';
import * as CalendarActions from '../actions/CalendarActions';

class TlogPageRootContainer extends Component {
  componentWillUpdate({ tlog: nextTlog }) {
    if (nextTlog.slug !== this.props.tlog.slug) {
      console.log('update tlog data');
    }
  }
  render() {
    return <TlogPageRoot {...this.props} />;
  }
}

export default connect(
  (state) => ({
    currentUserId: state.currentUser.data.id,
    isLogged: !!state.currentUser.data.id,
    tlog: state.tlog,
    tlogEntries: state.tlogEntries,
    tlogEntry: state.tlogEntry,
    calendar: state.calendar,
  }),
  (dispatch) => ({
    CalendarActions: bindActionCreators(CalendarActions, dispatch),
    TlogEntriesActions: bindActionCreators(TlogEntriesActions, dispatch),
    TlogEntryActions: bindActionCreators(TlogEntryActions, dispatch),
  })
)(TlogPageRootContainer);
