import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { RELATIONSHIP_STATE_FRIEND } from '../../../../shared/constants/RelationshipConstants';

import TlogPageBody from './TlogPageBody';
import Calendar from '../Calendar';

import {
  TLOG_SECTION_FAVORITE,
  TLOG_SECTION_FLOW,
  TLOG_SECTION_PRIVATE,
  TLOG_SECTION_TLOG,
} from '../../../../shared/constants/Tlog';

class TlogPageContainer extends Component {
  render() {
    const { author, design: { feedOpacity }, my_relationship, tlog_url } = this.props.tlog;
    const { currentUserId, entries_info, error, loadUrl,
            locale, nextPageFieldName, nextPageParamName, nextPageUrl, prevPageUrl,
            queryString, section } = this.props;
    const firstEntry = (entries_info && entries_info.items &&
                        entries_info.items.length && entries_info.items[0].entry) || {};

    return (
      <div>
        <TlogPageBody
          bgStyle={{ opacity: feedOpacity }}
          currentUserId={currentUserId}
          entries_info={entries_info}
          error={error}
          hostTlogUrl={tlog_url}
          loadUrl={loadUrl}
          locale={locale}
          nextPageFieldName={nextPageFieldName}
          nextPageParamName={nextPageParamName}
          nextPageUrl={nextPageUrl}
          prevPageUrl={prevPageUrl}
          queryString={queryString}
          relationship={my_relationship}
          section={section}
          user={author}
        />
        {(!author.is_privacy || (my_relationship === RELATIONSHIP_STATE_FRIEND)) &&
          <Calendar
            entryCreatedAt={firstEntry.created_at || (new Date()).toISOString()}
            entryId={firstEntry.id}
            locale={locale}
            tlogId={author.id}
          />}
      </div>
    );
  }
}

TlogPageContainer.propTypes = {
  currentUserId: PropTypes.number,
  entries_info: PropTypes.object,
  error: PropTypes.string,
  isLogged: PropTypes.bool,
  loadUrl: PropTypes.string,
  locale: PropTypes.string.isRequired,
  nextPageFieldName: PropTypes.string,
  nextPageParamName: PropTypes.string,
  nextPageUrl: PropTypes.string,
  prevPageUrl: PropTypes.string,
  queryString: PropTypes.string,
  section: PropTypes.oneOf([
    TLOG_SECTION_FAVORITE,
    TLOG_SECTION_FLOW,
    TLOG_SECTION_PRIVATE,
    TLOG_SECTION_TLOG,
  ]).isRequired,
  stats: PropTypes.object.isRequired,
};

TlogPageContainer.defaultProps = {
  section: TLOG_SECTION_TLOG,
};

export default TlogPageContainer;
