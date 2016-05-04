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
import { sendCategory } from '../../../../shared/react/services/Sociomantic';

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
    const section = this.section(this.props);

    getTlogEntriesIfNeeded({
      slug,
      section,
      date: this.date(this.props.params),
      query: this.query(location),
    });
    appStateSetSearchKey(this.searchKey(this.props));
    sendCategory(section);
  }
  componentWillReceiveProps(nextProps) {
    const { appStateSetSearchKey, getTlogEntriesIfNeeded } = this.props;
    const section = this.section(this.props);
    const nextSection = this.section(nextProps);

    getTlogEntriesIfNeeded({
      slug: nextProps.params.slug,
      section: nextSection,
      date: this.date(nextProps.params),
      query: this.query(nextProps.location),
    });
    appStateSetSearchKey(this.searchKey(nextProps));
    if (section !== nextSection) {
      sendCategory(nextSection);
    }
  }
  query({ query }) {
    return query && query.q;
  }
  searchKey(props) {
    const { currentUser: { data: userData }, tlog: { data: tlogId } } = props;
    const tlogData = props.entities.tlog[tlogId] || {};

    const section = this.section(props);

    if (section === TLOG_SECTION_TLOG) {
      if (tlogId === userData.id) {
        return SEARCH_KEY_MYTLOG;
      } else {
        return (tlogData && tlogData.isFlow)
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
    const { appendTlogEntries, currentUser, deleteEntry, entities, flow, flowViewStyle,
            getCalendar, location, queryString, tlog, tlogEntries } = this.props;
    const currentUserId = currentUser.data.id;
    const tlogData = entities.tlog[tlog.data] || {};

    return tlogData.isFlow
      ? <FlowPageBody
          appendTlogEntries={appendTlogEntries}
          bgStyle={{ opacity: (tlogData.design && tlogData.design.feedOpacity) || '1.0' }}
          currentUser={currentUser}
          currentUserId={currentUserId}
          deleteEntry={deleteEntry}
          entities={entities}
          flow={flow}
          flowViewStyle={flowViewStyle}
          location={location}
          queryString={queryString}
          tlog={tlog}
          tlogEntries={tlogEntries}
        />
      : <TlogPageBody
          appendTlogEntries={appendTlogEntries}
          bgStyle={{ opacity: (tlogData.design && tlogData.design.feedOpacity) || '1.0' }}
          currentUser={currentUser}
          currentUserId={currentUserId}
          deleteEntry={deleteEntry}
          entities={entities}
          getCalendar={getCalendar}
          queryString={queryString}
          section={this.section(this.props)}
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
  entities: PropTypes.object.isRequired,
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
    entities: state.entities,
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
