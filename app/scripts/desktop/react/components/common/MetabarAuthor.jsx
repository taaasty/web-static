/*global i18n */
import React, { PropTypes } from 'react';
import Avatar from '../../../../shared/react/components/common/Avatar';
import { Link } from 'react-router';
import uri from 'urijs';

function MetabarAuthor({ author, tlog, hostTlogId }) {
  function renderAvatar() {
    return window.SPA
      ? <Link className="meta-item__link" to={uri(tlog.url).path()}>
          <span className="meta-item__ava">
            <Avatar size={20} userpic={tlog.userpic || tlog.author.userpic} />
          </span>
        </Link>
      : <a className="meta-item__link" href={tlog.url}>
          <span className="meta-item__ava">
            <Avatar size={20} userpic={tlog.userpic || tlog.author.userpic} />
          </span>
        </a>;
  }

  function authorLink() {
    return window.SPA
      ? <Link className="meta-item__link" to={uri(author.url).path()}>
          {author.tag}
        </Link>
      : <a className="meta-item__link" href={author.url}>
          {author.tag}
        </a>;
  }

  function authorPostedIn() {
    return window.SPA
      ? <span>
          <Link className="meta-item__link" to={uri(author.url).path()}>
            {author.tag}
          </Link>
          {' ' + i18n.t('entry.meta.author_posted_in', { context: author.gender }) + ' '}
          <Link className="meta-item__link" to={uri(tlog.url).path()}>
            {tlog.tag}
          </Link>
        </span>
      : <span>
          <a className="meta-item__link" href={author.url}>
            {author.tag}
          </a>
          {' ' + i18n.t('entry.meta.author_posted_in', { context: author.gender }) + ' '}
          <a className="meta-item__link" href={tlog.url}>
            {tlog.tag}
          </a>
        </span>;
  }

  function repostFrom() {
    return window.SPA
      ? <span>
          {i18n.t('entry.meta.repost_from') + ' '}
          <Link className="meta-item__link" to={uri(tlog.url).path()}>
            {tlog.tag}
          </Link>
        </span>
      : <span>
          {i18n.t('entry.meta.repost_from')}
          <a className="meta-item__link" href={tlog.url}>
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
