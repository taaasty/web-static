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
import {
  TLOG_SECTION_FAVORITE,
  TLOG_SECTION_PRIVATE,
  TLOG_SECTION_TLOG,
} from '../../../../shared/constants/Tlog';

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
            prevPageUrl, section, user: { is_daylog } } = this.props;
    const isPaged = is_daylog && section === TLOG_SECTION_TLOG;

    return (
      <div>
        <EntryTlogsContainer {...this.props} />
        {isPaged && <TlogPagePagination nextPageUrl={nextPageUrl} prevPageUrl={prevPageUrl} />}
      </div>
    );
  }
  renderContents() {
    const { currentUserId, entries_info, error, relationship,
            section, user } = this.props;
    const items = (entries_info && entries_info.items) || [];
    const state = (relationship && relationship.state);

    if (error === ERROR_INVALID_DATE) {
      return <TlogPageText text={i18n.t('tlog.error_invalid_date')} />;
    } else {
      if (user.id && currentUserId === user.id) { //owner
        if (items.length > 0) {
          return this.renderTlog();
        } else {
          switch (section) {
          case TLOG_SECTION_FAVORITE:
            return <TlogPageText text={i18n.t('tlog.no_posts_favorite')} />;
          case TLOG_SECTION_PRIVATE:
            return <TlogPageText text={i18n.t('tlog.no_posts')} />;
          default:
            return <TlogPageAuthorEmpty name={user.name} slug={user.slug} />;
          }
        }
      } else { //guest
        if ((user.is_privacy || section === TLOG_SECTION_PRIVATE)
            && state !== RELATIONSHIP_STATE_FRIEND) {
          return <TlogPagePrivate />;
        }

        if (items.length > 0) {
          return this.renderTlog();
        } else {
          const msgText = user.is_daylog && section !== TLOG_SECTION_FAVORITE
            ? i18n.t('tlog.no_posts_daylog')
            : i18n.t('tlog.no_posts');
          return <TlogPageText text={msgText} />;
        }
      }
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
