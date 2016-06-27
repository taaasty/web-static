/*global i18n */
import React, { PropTypes } from 'react';
import Avatar from '../../../../shared/react/components/common/Avatar';
import UserSlug from '../UserSlug';
import { Link } from 'react-router';
import uri from 'urijs';

function MetabarAuthor({ author, size, tlog, hostTlogId }) {

  if (!author || !tlog) {
    return <span className="meta-item meta-item--user" />;
  }

  // inconsistency in list|item api responses
  const authorUrl = author.url || author.tlog_url;
  const tlogUrl = tlog.url || tlog.tlog_url;
  const tlogUserpic = tlog.userpic || tlog.author.userpic;

  function UserTag(user) {
    return <UserSlug showAsStar user={{ is_premium: user.is_premium, slug: user.tag }} />;
  }

  
  function renderAvatar() {
    return (
      <Link className="meta-item__link" to={uri(tlogUrl).path()}>
        <span className="meta-item__ava">
          <Avatar size={size} userpic={tlogUserpic} />
        </span>
      </Link>
    );
  }

  function authorLink() {
    return (
      <Link className="meta-item__link" to={uri(authorUrl).path()}>
        {UserTag(author)}
      </Link>
    );
  }

  function authorPostedIn() {
    return (
      <span>
        <Link className="meta-item__link" to={uri(authorUrl).path()}>
          {UserTag(author)}
        </Link>
        {' ' + i18n.t('entry.meta.author_posted_in', { context: author.gender }) + ' '}
        <Link className="meta-item__link" to={uri(tlogUrl).path()}>
          {UserTag(tlog)}
        </Link>
      </span>
    );
  }

  function repostFrom() {
    return (
      <span>
        {i18n.t('entry.meta.repost_from') + ' '}
        <Link className="meta-item__link" to={uri(tlogUrl).path()}>
          {UserTag(tlog)}
        </Link>
      </span>
    );
  }

  function renderContents() {
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
  }

  const contents = renderContents();
  
  return contents
    ? <span className="meta-item meta-item--user">
        <span className="meta-item__content">
          {renderAvatar()}
          {contents}
        </span>
      </span>
    : <span className="meta-item meta-item--user" />;
}

MetabarAuthor.propTypes = {
  author: PropTypes.object,
  hostTlogId: PropTypes.number,
  tlog: PropTypes.object,
};

MetabarAuthor.defaultProps = {
  author: {},
  size: 20,
  tlog: {},
};

export default MetabarAuthor;
