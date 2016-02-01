import React, { Component, PropTypes } from 'react';
import TlogPageBody from './TlogPageBody';
import { TLOG_SECTION_TLOG, TLOG_SECTION_FLOW } from '../../../../shared/constants/Tlog';

class TlogPageContainer extends Component {
  componentWillMount() {
    
  }
  render() {
    const { currentUserId, error, locale, queryString, route, tlog, tlogEntries,
            CalendarActions, TlogEntriesActions } = this.props;
    const { data: { author } } = tlog;
    const section = (author && author.is_flow)
            ? TLOG_SECTION_FLOW
            : route.path || TLOG_SECTION_TLOG;

    return (
      <TlogPageBody
        CalendarActions={CalendarActions}
        TlogEntriesActions={TlogEntriesActions}
        bgStyle={{ opacity: tlog.data.design.feedOpacity }}
        currentUserId={currentUserId}
        error={error}
        locale={locale}
        queryString={queryString}
        section={section}
        tlog={tlog}
        tlogEntries={tlogEntries}
      />
    );
  }
}

TlogPageContainer.propTypes = {
  CalendarActions: PropTypes.object.isRequired,
  TlogEntriesActions: PropTypes.object.isRequired,
  currentUserId: PropTypes.number,
  error: PropTypes.string,
  isLogged: PropTypes.bool,
  locale: PropTypes.string.isRequired,
  nextPageUrl: PropTypes.string,
  prevPageUrl: PropTypes.string,
  queryString: PropTypes.string,
  route: PropTypes.object,
  tlog: PropTypes.object,
  tlogEntries: PropTypes.object,
};

export default TlogPageContainer;
