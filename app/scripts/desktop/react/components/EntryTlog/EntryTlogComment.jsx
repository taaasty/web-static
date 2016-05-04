import React, { PropTypes } from 'react';
import Avatar from '../../../../shared/react/components/common/AvatarCamelCase';
import EntryTlogCommentMetabar from './EntryTlogCommentMetabar';
import UserSlug from '../UserSlug';
import { Link } from 'react-router';
import uri from 'urijs';

export const COMMENT_AVATAR_SIZE = 40;

function EntryTlogComment(props) {
  const { comment: { user, commentHtml } } = props;

  return (
    <article className="comment">
      <div className="comment__table">
        <div className="comment__table-cell">
          <Link
            className="comment__user"
            title={user.name}
            to={uri(user.tlogUrl).path()}
          >
            <span className="comment__avatar">
              <Avatar size={COMMENT_AVATAR_SIZE} userpic={user.userpic} />
            </span>
            <span className="comment__username comment__username--bold">
              <UserSlug showAsStar user={user} />
              {' '}
            </span>
          </Link>
          <span dangerouslySetInnerHTML={{__html: commentHtml}} />
          <EntryTlogCommentMetabar {...props} />
        </div>
      </div>
    </article>
  );
}

EntryTlogComment.propTypes = {
  comment: PropTypes.object.isRequired,
  commentator: PropTypes.object,
  entryUrl: PropTypes.string.isRequired,
  isFeed: PropTypes.bool,
};

export default EntryTlogComment;
