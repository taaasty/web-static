import React, { Component, PropTypes } from 'react';
import { Map } from 'immutable';
import { connect } from 'react-redux';
import { getCalendar } from '../../actions/CalendarActions';
import { flowViewStyle } from '../../actions/FlowActions';
import { deleteEntry, getTlogEntries, getTlogEntriesIfNeeded } from '../../actions/TlogEntriesActions';
import { sendCategory } from '../../../../shared/react/services/Sociomantic';

import TlogPageBody from './TlogPageBody';
import FlowPageBody from './FlowPageBody';
import {
  TLOG_SECTION_TLOG,
  TLOG_SECTION_FAVORITE,
  TLOG_SECTION_PRIVATE,
} from '../../../../shared/constants/Tlog';

const emptyFlow = Map();
const emptyTlog = Map();

class TlogPageContainer extends Component {
  componentWillMount() {
    const { getTlogEntriesIfNeeded } = this.props;

    getTlogEntriesIfNeeded(this.reqParams(this.props));
    sendCategory(this.section(this.props));
  }
  componentWillReceiveProps(nextProps) {
    const { getTlogEntriesIfNeeded } = this.props;
    const section = this.section(this.props);
    const nextSection = this.section(nextProps);

    getTlogEntriesIfNeeded(this.reqParams(nextProps));
    if (section !== nextSection) {
      sendCategory(nextSection);
    }
  }
  reqParams(props) {
    const { params, location } = props;

    return {
      slug: params.slug,
      section: this.section(props),
      date: this.date(params),
      query: this.query(location),
    };
  }
  query({ query }) {
    return query && query.q;
  }
  appendTlogEntries() {
    const { getTlogEntries } = this.props;

    getTlogEntries(Object.assign(
      this.reqParams(this.props),
      { sinceId: this.props.tlogEntries.data.nextSinceEntryId }
    ));
  }
  section(props) {
    const { path } = props.route;
    
    if (this.date(props.params)) {
      return TLOG_SECTION_TLOG;
    } else if (path === TLOG_SECTION_PRIVATE || path === TLOG_SECTION_FAVORITE) {
      return path;
    } else {
      return TLOG_SECTION_TLOG;
    }
  }
  date(params = {}) {
    const { year, month, day } = params;

    return (year && month && day) && `${year}-${month}-${day}`;
  }
  render() {
    const { deleteEntry, flow, flowState, flowViewStyle, getCalendar, isCurrentUser,
            location, queryString, tlog, tlogEntries } = this.props;
    const bgStyle = { opacity: tlog.getIn([ 'design', 'feedOpacity' ], '1.0') };

    return tlog.get('isFlow')
      ? <FlowPageBody
          appendTlogEntries={this.appendTlogEntries.bind(this)}
          bgStyle={bgStyle}
          deleteEntry={deleteEntry}
          flow={flow}
          flowState={flowState}
          flowViewStyle={flowViewStyle}
          location={location}
          queryString={queryString}
          tlog={tlog}
          tlogEntries={tlogEntries}
        />
      : <TlogPageBody
          appendTlogEntries={this.appendTlogEntries.bind(this)}
          bgStyle={bgStyle}
          deleteEntry={deleteEntry}
          getCalendar={getCalendar}
          isCurrentUser={isCurrentUser}
          queryString={queryString}
          section={this.section(this.props)}
          tlog={tlog}
          tlogEntries={tlogEntries}
        />;
  }
}

TlogPageContainer.propTypes = {
  deleteEntry: PropTypes.func.isRequired,
  flow: PropTypes.object.isRequired,
  flowState: PropTypes.object.isRequired,
  flowViewStyle: PropTypes.func.isRequired,
  getCalendar: PropTypes.func.isRequired,
  getTlogEntries: PropTypes.func.isRequired,
  getTlogEntriesIfNeeded: PropTypes.func.isRequired,
  isCurrentUser: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  queryString: PropTypes.string,
  route: PropTypes.object.isRequired,
  tlog: PropTypes.object.isRequired,
  tlogEntries: PropTypes.object.isRequired,
};

export default connect(
  (state, { params }) => {
    const { currentUser, tlogEntries, flow: flowState, entities } = state;
    const tlog = entities.get('tlog').find((t) => t.get('slug') === params.slug, null, emptyTlog);
    const currentUserId = currentUser.data && currentUser.data.id;
    const isCurrentUser = !!(currentUserId && currentUserId === tlog.get('id'));
    
    return {
      flowState,
      isCurrentUser,
      tlog,
      tlogEntries,
      flow: entities.getIn([ 'flow', String(tlog.get('id')) ], emptyFlow),
    };
  },
  {
    deleteEntry,
    getCalendar,
    getTlogEntries,
    getTlogEntriesIfNeeded,
    flowViewStyle,
  }
)(TlogPageContainer);
