/*global i18n */
import React, { Component, PropTypes } from 'react';
import queryString from 'query-string';
import EntryTlogsContainer from '../EntryTlogs/EntryTlogsContainerRedux';
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
  };
  componentWillMount() {
    const queryHash = queryString.parse(window.location.search);
    this.setState({ prevButtonVisible: queryHash.since_entry_id });
  }
  renderTlog() {
    const { nextPageUrl, prevPageUrl, section,
            tlog: { author: { id: tlogId, is_daylog } } } = this.props;
    const isPaged = is_daylog && section === TLOG_SECTION_TLOG;

    return (
      <div>
        <EntryTlogsContainer {...this.props} />
        {isPaged && <TlogPagePagination nextPageUrl={nextPageUrl} prevPageUrl={prevPageUrl} />}
      </div>
    );
  }
  renderContents() {
    const { currentUserId, error, queryString, section,
            tlogEntries: { items }, tlog: { author, my_relationship: state } } = this.props;

    if (error === ERROR_INVALID_DATE) {
      return <TlogPageText text={i18n.t('tlog.error_invalid_date')} />;
    } else {
      if (author.id && currentUserId === author.id) { //owner
        if (items.length > 0) {
          return this.renderTlog();
        } else {
          switch (section) {
          case TLOG_SECTION_FAVORITE:
            return <TlogPageText text={i18n.t('tlog.no_posts_favorite')} />;
          case TLOG_SECTION_PRIVATE:
            return <TlogPageText text={i18n.t('tlog.no_posts')} />;
          default:
            return queryString
              ? <TlogPageText text={i18n.t('tlog.no_posts_query', { query: queryString })} />
              : <TlogPageAuthorEmpty name={author.name} slug={author.slug} />;
          }
        }
      } else { //guest
        if (author.is_privacy && state !== RELATIONSHIP_STATE_FRIEND) {
          return <TlogPagePrivate text={i18n.t('tlog.private')} />;
        }

        if (section === TLOG_SECTION_PRIVATE) {
          return <TlogPagePrivate text={i18n.t('tlog.section_private')} />;
        } else if (items.length > 0) {
          return this.renderTlog();
        } else {
          const msgText = queryString
            ? <TlogPageText text={i18n.t('tlog.no_posts_query', { query: queryString })} />
            : author.is_daylog && section !== TLOG_SECTION_FAVORITE
              ? i18n.t('tlog.no_posts_daylog')
              : i18n.t('tlog.no_posts');
          return <TlogPageText text={msgText} />;
        }
      }
    }
  }
  render() {
    const { bgStyle, tlog: { author, tlog_url } } = this.props;
    const { prevButtonVisible } = this.state;

    return (
      <div className="page-body">
        {author.id && prevButtonVisible && <PreviousEntriesButton href={tlog_url} />}
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
  error: PropTypes.string,
  queryString: PropTypes.string,
  section: PropTypes.string.isRequired,
  tlog: PropTypes.object,
  tlogEntries: PropTypes.object,
};

TlogPageBody.defaultProps = {
  bgStyle: { opacity: '1.0' },
  tlog: {
    author: {
      id: null,
      is_daylog: false,
      is_privacy: false,
    },
    tlog_url: '',
  },
  tlogEntries: {
    items: [],
  },
};

export default TlogPageBody;
