import React, { PropTypes } from 'react';
import TlogPageBody from './TlogPageBody';
import { TLOG_SECTION_TLOG, TLOG_SECTION_FLOW } from '../../../../shared/constants/Tlog';

function TlogPageContainer(props) {
  const { currentUserId, error, locale, queryString, route, tlog, tlogEntries,
          CalendarActions, TlogEntriesActions } = props;
  const { author } = tlog;
  const section = (author && author.is_flow)
          ? TLOG_SECTION_FLOW
          : route.path || TLOG_SECTION_TLOG;

  return (
    <TlogPageBody
      CalendarActions={CalendarActions}
      TlogEntriesActions={TlogEntriesActions}
      bgStyle={{ opacity: tlog.design.feedOpacity }}
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

TlogPageContainer.propTypes = {
  currentUserId: PropTypes.number,
  error: PropTypes.string,
  isLogged: PropTypes.bool,
  locale: PropTypes.string.isRequired,
  nextPageUrl: PropTypes.string,
  prevPageUrl: PropTypes.string,
  queryString: PropTypes.string,
  route: PropTypes.object,
  tlogEntries: PropTypes.object,
};

export default TlogPageContainer;
