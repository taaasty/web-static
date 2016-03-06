import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getCalendar } from '../../actions/CalendarActions';
import { flowViewStyle } from '../../actions/FlowActions';
import { appendTlogEntries, deleteEntry, getTlogEntriesIfNeeded } from '../../actions/TlogEntriesActions';
import { appStateSetSearchKey } from '../../actions/AppStateActions';
import {
  SEARCH_KEY_TLOG,
  SEARCH_KEY_MYTLOG,
  SEARCH_KEY_FLOW,
  SEARCH_KEY_FAVORITES,
  SEARCH_KEY_PRIVATES,
} from '../../constants/SearchConstants';

import TlogPageBody from './TlogPageBody';
import FlowPageBody from './FlowPageBody';
import {
  TLOG_SECTION_TLOG,
  TLOG_SECTION_FAVORITE,
  TLOG_SECTION_PRIVATE,
} from '../../../../shared/constants/Tlog';

class TlogPageContainer extends Component {
  componentWillMount() {
    const { appStateSetSearchKey, getTlogEntriesIfNeeded,
            params: { slug }, location } = this.props;

    getTlogEntriesIfNeeded({
      slug,
      section: this.section(this.props),
      date: this.date(this.props.params),
      sinceId: this.sinceId(location),
    });
    appStateSetSearchKey(this.searchKey(this.props));
  }
  componentWillReceiveProps(nextProps) {
    const { appStateSetSearchKey, getTlogEntriesIfNeeded } = this.props;

    getTlogEntriesIfNeeded({
      slug: nextProps.params.slug,
      section: this.section(nextProps),
      date: this.date(nextProps.params),
      sinceId: this.sinceId(nextProps.location),
    });
    appStateSetSearchKey(this.searchKey(nextProps));
  }
  searchKey(props) {
    const { currentUser: { data: userData }, tlog: { data: tlogData } } = props;

    const section = this.section(props);

    if (section === TLOG_SECTION_TLOG) {
      if (tlogData.id === userData.id) {
        return SEARCH_KEY_MYTLOG;
      } else {
        return (tlogData.author && tlogData.author.is_flow)
          ? SEARCH_KEY_FLOW
          : SEARCH_KEY_TLOG;
      }
    } else if (section === TLOG_SECTION_FAVORITE) {
      return SEARCH_KEY_FAVORITES;
    } else if (section === TLOG_SECTION_PRIVATE) {
      return SEARCH_KEY_PRIVATES;
    } else {
      return SEARCH_KEY_TLOG;
    }
  }
  sinceId({ query }) {
    return query && query.since_entry_id;
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
    const { appendTlogEntries, currentUser, deleteEntry, flow, flowViewStyle,
            getCalendar, location, queryString, tlog, tlogEntries } = this.props;
    const sinceId = this.sinceId(location);
    const currentUserId = currentUser.data.id;

    return (tlog.data.author && tlog.data.author.is_flow)
      ? <FlowPageBody
          appendTlogEntries={appendTlogEntries}
          bgStyle={{ opacity: tlog.data.design.feedOpacity }}
          currentUser={currentUser}
          currentUserId={currentUserId}
          deleteEntry={deleteEntry}
          flow={flow}
          flowViewStyle={flowViewStyle}
          location={location}
          queryString={queryString}
          sinceId={sinceId}
          tlog={tlog}
          tlogEntries={tlogEntries}
        />
      : <TlogPageBody
          appendTlogEntries={appendTlogEntries}
          bgStyle={{ opacity: tlog.data.design.feedOpacity }}
          currentUser={currentUser}
          currentUserId={currentUserId}
          deleteEntry={deleteEntry}
          getCalendar={getCalendar}
          queryString={queryString}
          section={this.section(this.props)}
          sinceId={sinceId}
          tlog={tlog}
          tlogEntries={tlogEntries}
        />;
  }
}

TlogPageContainer.propTypes = {
  appStateSetSearchKey: PropTypes.func.isRequired,
  appendTlogEntries: PropTypes.func.isRequired,
  currentUser: PropTypes.object.isRequired,
  deleteEntry: PropTypes.func.isRequired,
  flow: PropTypes.object.isRequired,
  flowViewStyle: PropTypes.func.isRequired,
  getCalendar: PropTypes.func.isRequired,
  getTlogEntriesIfNeeded: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  queryString: PropTypes.string,
  route: PropTypes.object.isRequired,
  tlog: PropTypes.object.isRequired,
  tlogEntries: PropTypes.object.isRequired,
};

export default connect(
  (state) => ({
    currentUser: state.currentUser,
    flow: state.flow,
    tlog: state.tlog,
    tlogEntries: state.tlogEntries,
  }),
  {
    appStateSetSearchKey,
    appendTlogEntries,
    deleteEntry,
    getCalendar,
    getTlogEntriesIfNeeded,
    flowViewStyle,
  }
)(TlogPageContainer);
