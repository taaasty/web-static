import React, { Component, PropTypes } from 'react';
import TlogPageBody from './TlogPageBody';
import {
  TLOG_SECTION_FAVORITE,
  TLOG_SECTION_FLOW,
  TLOG_SECTION_PRIVATE,
  TLOG_SECTION_TLOG,
} from '../../../../shared/constants/Tlog';

class TlogPageContainer extends Component {
  render() {
    const { author, design: { feedOpacity }, my_relationship, tlog_url } = this.props.tlog;
    const { currentUserId, tlogEntries, error, loadUrl,
            locale, nextPageFieldName, nextPageParamName, nextPageUrl, prevPageUrl,
            queryString, section } = this.props;

    return (
      <TlogPageBody
        bgStyle={{ opacity: feedOpacity }}
        currentUserId={currentUserId}
        entries_info={tlogEntries}
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
};

TlogPageContainer.defaultProps = {
  section: TLOG_SECTION_TLOG,
};

export default TlogPageContainer;
