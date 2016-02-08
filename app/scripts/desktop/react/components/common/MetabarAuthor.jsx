/*global i18n */
import React, { PropTypes } from 'react';
import Avatar from '../../../../shared/react/components/common/Avatar';
import { Link } from 'react-router';
import uri from 'urijs';

function MetabarAuthor({ author, tlog, hostTlogId }) {
  // inconsistency in list|item api responses
  const authorUrl = author.url || author.tlog_url;
  const tlogUrl = tlog.url || tlog.tlog_url;
  const tlogUserpic = tlog.userpic || tlog.author.userpic;

  
  function renderAvatar() {
    return window.SPA
      ? <Link className="meta-item__link" to={uri(tlogUrl).path()}>
          <span className="meta-item__ava">
            <Avatar size={20} userpic={tlogUserpic} />
          </span>
        </Link>
      : <a className="meta-item__link" href={tlogUrl}>
          <span className="meta-item__ava">
            <Avatar size={20} userpic={tlogUserpic} />
          </span>
        </a>;
  }

  function authorLink() {
    return window.SPA
      ? <Link className="meta-item__link" to={uri(authorUrl).path()}>
          {author.tag}
        </Link>
      : <a className="meta-item__link" href={authorUrl}>
          {author.tag}
        </a>;
  }

  function authorPostedIn() {
    return window.SPA
      ? <span>
          <Link className="meta-item__link" to={uri(authorUrl).path()}>
            {author.tag}
          </Link>
          {' ' + i18n.t('entry.meta.author_posted_in', { context: author.gender }) + ' '}
          <Link className="meta-item__link" to={uri(tlogUrl).path()}>
            {tlog.tag}
          </Link>
        </span>
      : <span>
          <a className="meta-item__link" href={authorUrl}>
            {author.tag}
          </a>
          {' ' + i18n.t('entry.meta.author_posted_in', { context: author.gender }) + ' '}
          <a className="meta-item__link" href={tlogUrl}>
            {tlog.tag}
          </a>
        </span>;
  }

  function repostFrom() {
    return window.SPA
      ? <span>
          {i18n.t('entry.meta.repost_from') + ' '}
          <Link className="meta-item__link" to={uri(tlogUrl).path()}>
            {tlog.tag}
          </Link>
        </span>
      : <span>
          {i18n.t('entry.meta.repost_from')}
          <a className="meta-item__link" href={tlogUrl}>
            {tlog.tag}
          </a>
        </span>;
  }

  function renderContents() {
    if (tlog != null && author != null) {
      if (hostTlogId == null) {
        if (author.id === tlog.id) {
          return authorLink();
        } else {
          return authorPostedIn();
        }
      } else if (hostTlogId === tlog.id) {
        if (author.id !== tlog.id) {
          return authorPostedIn();
        } else {
          return null;
        }
      } else if (hostTlogId !== tlog.id) {
        if (author.id === tlog.id) {
          return repostFrom();
        } else {
          return authorPostedIn();
        }
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  const contents = renderContents();
  
  return contents
    ? <span className="meta-item meta-item--user">
        <span className="meta-item__content">
          {renderAvatar()}
          {contents}
        </span>
      </span>
    : <noscript />;
}

MetabarAuthor.propTypes = {
  author: PropTypes.object,
  hostTlogId: PropTypes.number,
  tlog: PropTypes.object.isRequired,
};

export default MetabarAuthor;
