import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TlogPageRoot from '../components/TlogPageRoot';

import * as CalendarActions from '../actions/CalendarActions';
import * as FlowActions from '../actions/FlowActions';
import * as RelationshipActions from '../actions/RelationshipActions';
import * as TlogActions from '../actions/TlogActions';
import * as TlogEntriesActions from '../actions/TlogEntriesActions';
import * as TlogEntryActions from '../actions/TlogEntryActions';

class TlogPageRootContainer extends Component {
  render() {
    const { CalendarActions, FlowActions, RelationshipActions, TlogActions, TlogEntriesActions, TlogEntryActions,
            calendar, children, currentUser, flow, location, params, tlog, tlogEntries, tlogEntry } = this.props;
    const currentUserId = currentUser.data.id;
    const isLogged = !!currentUser.data.id;

    return (
      <TlogPageRoot
        CalendarActions={CalendarActions}
        FlowActions={FlowActions}
        RelationshipActions={RelationshipActions}
        TlogActions={TlogActions}
        TlogEntriesActions={TlogEntriesActions}
        TlogEntryActions={TlogEntryActions}
        calendar={calendar}
        children={children}
        currentUser={currentUser}
        currentUserId={currentUserId}
        flow={flow}
        isLogged={isLogged}
        location={location}
        params={params}
        tlog={tlog}
        tlogEntries={tlogEntries}
        tlogEntry={tlogEntry}
      />
    );
  }
}

TlogPageRootContainer.propTypes = {
  CalendarActions: PropTypes.object.isRequired,
  FlowActions: PropTypes.object.isRequired,
  RelationshipActions: PropTypes.object.isRequired,
  TlogActions: PropTypes.object.isRequired,
  TlogEntriesActions: PropTypes.object.isRequired,
  TlogEntryActions: PropTypes.object.isRequired,
  calendar: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
  ]).isRequired,
  currentUser: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  tlog: PropTypes.object.isRequired,
  tlogEntries: PropTypes.object.isRequired,
  tlogEntry: PropTypes.object.isRequired,
};

export default connect(
  (state) => ({
    calendar: state.calendar,
    currentUser: state.currentUser,
    flow: state.flow,
    tlog: state.tlog,
    tlogEntries: state.tlogEntries,
    tlogEntry: state.tlogEntry,
  }),
  (dispatch) => ({
    CalendarActions: bindActionCreators(CalendarActions, dispatch),
    FlowActions: bindActionCreators(FlowActions, dispatch),
    RelationshipActions: bindActionCreators(RelationshipActions, dispatch),
    TlogActions: bindActionCreators(TlogActions, dispatch),
    TlogEntriesActions: bindActionCreators(TlogEntriesActions, dispatch),
    TlogEntryActions: bindActionCreators(TlogEntryActions, dispatch),
  })
)(TlogPageRootContainer);
