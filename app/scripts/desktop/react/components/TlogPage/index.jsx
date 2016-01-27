import React, { Component, PropTypes } from 'react';
import TlogPageBody from './TlogPageBody';
import { TLOG_SECTION_TLOG, TLOG_SECTION_FLOW } from '../../../../shared/constants/Tlog';

class TlogPageContainer extends Component {
  render() {
    const { author, design: { feedOpacity }, my_relationship, tlog_url } = this.props.tlog;
    const { currentUserId, tlogEntries, error, loadUrl, locale, nextPageUrl, prevPageUrl,
            queryString, route } = this.props;
    const section = (author && author.is_flow)
            ? TLOG_SECTION_FLOW
            : route.path || TLOG_SECTION_TLOG;

    return (
      <TlogPageBody
        bgStyle={{ opacity: feedOpacity }}
        currentUserId={currentUserId}
        entries_info={tlogEntries}
        error={error}
        hostTlogUrl={tlog_url}
        loadUrl={loadUrl}
        locale={locale}
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
  error: PropTypes.string,
  isLogged: PropTypes.bool,
  locale: PropTypes.string.isRequired,
  nextPageUrl: PropTypes.string,
  prevPageUrl: PropTypes.string,
  queryString: PropTypes.string,
  route: PropTypes.object.isRequired,
  tlogEntries: PropTypes.object,
};

export default TlogPageContainer;
