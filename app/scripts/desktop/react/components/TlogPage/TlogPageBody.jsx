/*global i18n */
import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import EntryTlogsContainer from '../EntryTlogs';
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
  handleDeleteEntry(entryId) {
    this.props.deleteEntry(entryId);
    this.props.getCalendar(this.props.tlog.data.author.id, true);
  }
  renderTlog() {
    const { appendTlogEntries, currentUser, entities, section,
            tlog: { data: tlogId }, tlogEntries } = this.props;
    const tlog = entities.tlog[tlogId] || {};
    const { data: { nextDate, prevDate } } = tlogEntries;
    const isPaged = tlog.isDaylog && section === TLOG_SECTION_TLOG;

    return (
      <div>
        <EntryTlogsContainer
          currentUser={currentUser}
          entities={entities}
          entries={tlogEntries}
          handleDeleteEntry={this.handleDeleteEntry.bind(this)}
          hostTlogId={tlog.author}
          loadMoreEntries={appendTlogEntries}
        />
        {isPaged &&
         <TlogPagePagination
           nextPagePath={this.date2path(tlog.slug, nextDate)}
           prevPagePath={this.date2path(tlog.slug, prevDate)}
         />}
      </div>
    );
  }
  renderContents() {
    const { currentUser, entities, queryString, tlogEntries, tlog } = this.props;
    const { isFetching: isFetchingEntries, data: { items }, error, section } = tlogEntries;
    const { isFetching: isFetchingTlog, data: tlogId } = tlog;
    const author = entities.tlog[tlogId] || {};
    const { myRelationship: state } = author;

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
        if (author.isPrivacy && state !== RELATIONSHIP_STATE_FRIEND) {
          return <TlogPagePrivate text={i18n.t('tlog.private')} />;
        }

        if (section === TLOG_SECTION_PRIVATE) {
          return <TlogPagePrivate text={i18n.t('tlog.section_private')} />;
        } else if (items.length > 0 || isFetchingEntries || isFetchingTlog) {
          return this.renderTlog();
        } else {
          const msgText = queryString
            ? <TlogPageText text={i18n.t('tlog.no_posts_query', { query: queryString })} />
            : author.isDaylog && section !== TLOG_SECTION_FAVORITE
              ? i18n.t('tlog.no_posts_daylog')
              : i18n.t('tlog.no_posts');
          return <TlogPageText text={msgText} />;
        }
      }
    }
  }
  render() {
    const { bgStyle, entities, section, tlog: { data: tlogId } } = this.props;
    const { tag } = entities.tlog[tlogId] || {};
    const title = [
      tag,
      section === TLOG_SECTION_PRIVATE
        ? ' - ' + i18n.t('tlog.title_private')
        : section === TLOG_SECTION_FAVORITE ? ' - ' + i18n.t('tlog.title_favorite') : '',
    ].join('');

    return (
      <div className="page-body">
        <Helmet title={title} />
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
  appendTlogEntries: PropTypes.func.isRequired,
  bgStyle: PropTypes.object,
  currentUser: PropTypes.object,
  deleteEntry: PropTypes.func.isRequired,
  entities: PropTypes.object.isRequired,
  error: PropTypes.string,
  getCalendar: PropTypes.func.isRequired,
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
        isDaylog: false,
        isPrivacy: false,
      },
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
