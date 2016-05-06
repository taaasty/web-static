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
    const { tlog } = this.props;

    this.props.deleteEntry(entryId);
    if (tlog.id) {
      this.props.getCalendar(tlog.id, true);
    }
  }
  renderTlog() {
    const { appendTlogEntries, currentUser, section, tlog, tlogEntries } = this.props;
    const { data: { nextDate, prevDate } } = tlogEntries;
    const isPaged = tlog.isDaylog && section === TLOG_SECTION_TLOG;

    return (
      <div>
        <EntryTlogsContainer
          currentUser={currentUser}
          entries={tlogEntries}
          handleDeleteEntry={this.handleDeleteEntry.bind(this)}
          hostTlogId={tlog.id}
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
    const { currentUser, queryString, tlogEntries, tlog } = this.props;
    const { isFetching: isFetchingEntries, data: { items }, error, section } = tlogEntries;
    const { myRelationship: state } = tlog;

    if (error && error.error === ERROR_INVALID_DATE) {
      return <TlogPageError text={i18n.t('tlog.error_invalid_date')} />;
    } else if (error && error.response_code === 404) {
      return <TlogPageError text={error.error} />;
    } else {
      if (tlog.slug && currentUser.slug === tlog.slug) { //owner
        if (items.length > 0 || isFetchingEntries) {
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
              : <TlogPageAuthorEmpty name={tlog.name} slug={tlog.slug} />;
          }
        }
      } else { //guest
        if (tlog.isPrivacy && state !== RELATIONSHIP_STATE_FRIEND) {
          return <TlogPagePrivate text={i18n.t('tlog.private')} />;
        }

        if (section === TLOG_SECTION_PRIVATE) {
          return <TlogPagePrivate text={i18n.t('tlog.section_private')} />;
        } else if (items.length > 0 || isFetchingEntries) {
          return this.renderTlog();
        } else {
          const msgText = queryString
            ? <TlogPageText text={i18n.t('tlog.no_posts_query', { query: queryString })} />
            : tlog.isDaylog && section !== TLOG_SECTION_FAVORITE
              ? i18n.t('tlog.no_posts_daylog')
              : i18n.t('tlog.no_posts');
          return <TlogPageText text={msgText} />;
        }
      }
    }
  }
  render() {
    const { bgStyle, section, tlog: { tag } } = this.props;
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
  error: PropTypes.string,
  getCalendar: PropTypes.func.isRequired,
  queryString: PropTypes.string,
  section: PropTypes.string.isRequired,
  sinceId: PropTypes.string,
  tlog: PropTypes.object.isRequired,
  tlogEntries: PropTypes.object,
};

TlogPageBody.defaultProps = {
  bgStyle: { opacity: '1.0' },
  tlog: {},
  tlogEntries: {
    data: {
      items: [],
    },
  },
  section: TLOG_SECTION_TLOG,
};

export default TlogPageBody;
