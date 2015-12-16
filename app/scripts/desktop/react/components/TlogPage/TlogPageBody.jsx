/*global i18n */
import React, { Component, PropTypes } from 'react';
import queryString from 'query-string';
import EntryTlogsContainer from '../EntryTlogs/EntryTlogsContainer';
import PreviousEntriesButton from '../common/PreviousEntriesButton';
import TlogPagePagination from './TlogPagePagination';
import TlogPagePrivate from './TlogPagePrivate';
import TlogPageText from './TlogPageText';
import TlogPageAuthorEmpty from './TlogPageAuthorEmpty';

import { ERROR_INVALID_DATE } from '../../../../shared/constants/ErrorConstants';
import { RELATIONSHIP_STATE_FRIEND } from '../../../../shared/constants/RelationshipConstants';
import { TLOG_SECTION_FAVORITE } from '../../../../shared/constants/Tlog';

class TlogPageBody extends Component {
  state = {
    prevButtonVisible: false,
  }
  componentWillMount() {
    const queryHash = queryString.parse(window.location.search);
    this.setState({ prevButtonVisible: queryHash.since_entry_id });
  }
  renderTlog() {
    const { entries_info: { has_more }, nextPageUrl,
            prevPageUrl, user: { is_daylog } } = this.props;
    const isPaged = is_daylog && has_more;

    return (
      <div>
        <EntryTlogsContainer {...this.props} />
        {isPaged && <TlogPagePagination nextPageUrl={nextPageUrl} prevPageUrl={prevPageUrl} />}
      </div>
    );
  }
  renderContents() {
    const { currentUserId, entries_info: { items }, error, relationship: { state },
            section, user } = this.props;

    if (error === ERROR_INVALID_DATE) {
      return <TlogPageText text={i18n.t('tlog.error_invalid_date')} />;
    } else if (user.is_privacy && state !== RELATIONSHIP_STATE_FRIEND) {
      return <TlogPagePrivate />;
    } else if (items.length > 0) {
      return this.renderTlog();
    } else if (user.id && currentUserId === user.id) {
      return section === TLOG_SECTION_FAVORITE
        ? <TlogPageText text={i18n.t('tlog.no_posts_favorite')} />
        : <TlogPageAuthorEmpty name={user.name} slug={user.slug} />;
    } else {
      return <TlogPageText text={i18n.t(user.is_daylog ? 'tlog.no_posts_daylog' : 'tlog.no_posts')} />;
    }
  }
  render() {
    const { bgStyle, host_tlog_id, hostTlogUrl } = this.props;
    const { prevButtonVisible } = this.state;

    return (
      <div className="page-body">
        {host_tlog_id && prevButtonVisible && <PreviousEntriesButton href={hostTlogUrl} />}
        <div className="content-area">
          <div className="content-area__bg" style={bgStyle} />
          <div className="content-area__inner">
            {this.renderContents()}
          </div>
        </div>
      </div>
    );
  }
}

TlogPageBody.propTypes = {
  bgStyle: PropTypes.object,
  currentUserId: PropTypes.number,
  entries_info: PropTypes.object,
  error: PropTypes.string,
  hostTlogUrl: PropTypes.string,
  host_tlog_id: PropTypes.number,
  nextPageUrl: PropTypes.string,
  prevPageUrl: PropTypes.string,
  relationship: PropTypes.object,
  section: PropTypes.string.isRequired,
  user: PropTypes.object,
};

TlogPageBody.defaultProps = {
  bgStyle: { opacity: '1.0' },
  entries_info: {
    items: [],
  },
  hostTlogUrl: '',
  relationship: {},
  user: {
    id: null,
    is_daylog: false,
    is_privacy: false,
  },
};

export default TlogPageBody;
