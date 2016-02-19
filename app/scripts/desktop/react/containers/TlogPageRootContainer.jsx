import React, { Component, PropTypes } from 'react';
import TlogPageRoot from '../components/TlogPageRoot';

class TlogPageRootContainer extends Component {
  render() {
    const { CalendarActions, FlowActions, RelationshipActions, TlogActions, TlogEntriesActions, TlogEntryActions,
            calendar, children, currentUser, flow, location, params, tlog, tlogEntries, tlogEntry } = this.props;
    const currentUserId = currentUser.data.id;

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
  flow: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  tlog: PropTypes.object.isRequired,
  tlogEntries: PropTypes.object.isRequired,
  tlogEntry: PropTypes.object.isRequired,
};

export default TlogPageRootContainer;
