/*global i18n */
import React, { PropTypes } from 'react';
import Avatar from '../../../../shared/react/components/common/AvatarCamelCase';
import UserSlug from '../UserSlug';
import { Link } from 'react-router';
import uri from 'urijs';
import { pure } from 'recompose';

function MetabarAuthor(props) {
  const {
    author,
    size,
    tlog,
    hostTlogId,
  } = props;
  const authorId = author.get('id');
  const tlogId = tlog.get('id');

  if (!authorId || !tlogId) {
    return <span className="meta-item meta-item--user" />;
  }

  // inconsistency in list|item api responses
  const authorUrl = author.get('url', author.get('tlogUrl'));
  const tlogUrl = tlog.get('url', tlog.get('tlogUrl'));
  const tlogUserpic = tlog.get('userpic').toJS();

  function UserTag(user) {
    return (
      <UserSlug
        showAsStar
        user={user.set('slug', user.get('tag'))}
      />
    );
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
        {' ' + i18n.t('entry.meta.author_posted_in', { context: author.get('gender') }) + ' '}
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
      if (authorId === tlogId) {
        return authorLink();
      } else {
        return authorPostedIn();
      }
    } else if (hostTlogId === tlogId) {
      if (authorId !== tlogId) {
        return authorPostedIn();
      } else {
        return null;
      }
    } else if (hostTlogId !== tlogId) {
      if (authorId === tlogId) {
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
    ? (
      <span className="meta-item meta-item--user">
        <span className="meta-item__content">
          {renderAvatar()}
          {contents}
        </span>
      </span>
    )
    : <span className="meta-item meta-item--user" />;
}

MetabarAuthor.propTypes = {
  author: PropTypes.object.isRequired,
  hostTlogId: PropTypes.number,
  size: PropTypes.number,
  tlog: PropTypes.object.isRequired,
};

MetabarAuthor.defaultProps = {
  size: 20,
};

export default pure(MetabarAuthor);
