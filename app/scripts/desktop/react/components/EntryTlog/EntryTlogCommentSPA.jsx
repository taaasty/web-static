import React, { PropTypes } from 'react';
import Avatar from '../../../../shared/react/components/common/Avatar';
import EntryTlogCommentMetabar from './EntryTlogCommentMetabar';
import { Link } from 'react-router';
import uri from 'urijs';

function EntryTlogComment(props) {
  const { comment: { user, comment_html } } = props;

  return (
    <article className="comment">
      <div className="comment__table">
        <div className="comment__table-cell">
          <Link
            className="comment__user"
            title={user.name}
            to={uri(user.tlog_url).path()}
          >
            <span className="comment__avatar">
              <Avatar size={35} userpic={user.userpic} />
            </span>
            <span className="comment__username comment__username--bold">
              {user.name} {}
            </span>
          </Link>
          <span dangerouslySetInnerHTML={{__html: comment_html}} />
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
