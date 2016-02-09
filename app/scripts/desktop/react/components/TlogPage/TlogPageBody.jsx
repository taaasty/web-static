/*global i18n */
import React, { Component, PropTypes } from 'react';
import EntryTlogsContainer from '../EntryTlogs/EntryTlogsContainerRedux';
import PreviousEntriesButton from '../common/PreviousEntriesButton';
import TlogPagePagination from './TlogPagePagination';
import TlogPagePrivate from './TlogPagePrivate';
import TlogPageText from './TlogPageText';
import TlogPageError from './TlogPageError';
import TlogPageAuthorEmpty from './TlogPageAuthorEmpty';

import { ERROR_INVALID_DATE } from '../../../../shared/constants/ErrorConstants';
import { RELATIONSHIP_STATE_FRIEND } from '../../../../shared/constants/RelationshipConstants';
import {
  TLOG_SECTION_FAVORITE,
  TLOG_SECTION_PRIVATE,
  TLOG_SECTION_TLOG,
} from '../../../../shared/constants/Tlog';

class TlogPageBody extends Component {
  date2path(slug, date=''){
    return date && `/~${slug}/${date.replace(/\-/g, '/')}`;
  }
  renderTlog() {
    const { section, tlog: { data: { author } },
            tlogEntries: { data: { next_date, prev_date } } } = this.props;
    const isPaged = author.is_daylog && section === TLOG_SECTION_TLOG;

    return (
      <div>
        <EntryTlogsContainer {...this.props} />
        {isPaged &&
         <TlogPagePagination
           nextPagePath={this.date2path(author.slug, next_date)}
           prevPagePath={this.date2path(author.slug, prev_date)}
         />}
      </div>
    );
  }
  renderContents() {
    const { currentUser, queryString, tlogEntries, tlog } = this.props;
    const { isFetching: isFetchingEntries, data: { items }, error, section } = tlogEntries;
    const { isFetching: isFetchingTlog, data: { author, my_relationship: state } } = tlog;

    if (error && error.error === ERROR_INVALID_DATE) {
      return <TlogPageError text={i18n.t('tlog.error_invalid_date')} />;
    } else if (error && error.response_code === 404) {
      return <TlogPageError text={error.error} />;
    } else {
      if (author.slug && currentUser.data.slug === author.slug) { //owner
        if (items.length > 0 || isFetchingEntries || isFetchingTlog) {
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
        } else if (items.length > 0 || isFetchingEntries || isFetchingTlog) {
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
    const { bgStyle, sinceId, tlog: { data: { author, tlog_url } } } = this.props;

    return (
      <div className="page-body">
        {author.id && !!sinceId && <PreviousEntriesButton href={tlog_url} />}
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
  currentUser: PropTypes.object,
  currentUserId: PropTypes.number,
  error: PropTypes.string,
  queryString: PropTypes.string,
  section: PropTypes.string.isRequired,
  sinceId: PropTypes.string,
  tlog: PropTypes.object,
  tlogEntries: PropTypes.object,
};

TlogPageBody.defaultProps = {
  bgStyle: { opacity: '1.0' },
  tlog: {
    data: {
      author: {
        id: null,
        is_daylog: false,
        is_privacy: false,
      },
      tlog_url: '',
    },
  },
  tlogEntries: {
    data: {
      items: [],
    },
  },
  section: TLOG_SECTION_TLOG,
};

export default TlogPageBody;
