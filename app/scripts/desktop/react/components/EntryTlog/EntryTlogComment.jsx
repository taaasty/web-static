import React, { PropTypes } from 'react';
import Avatar from '../../../../shared/react/components/common/Avatar';
import EntryTlogCommentMetabar from './EntryTlogCommentMetabar';

function EntryTlogComment(props) {
  const { comment: { user, comment_html } } = props;
  return (
    <article className="comment">
      <div className="comment__table">
        <div className="comment__table-cell">
          <a
            className="comment__user"
            href={user.tlog_url}
            target="_blank"
            title={user.name}
          >
            <span className="comment__avatar">
              <Avatar size={35} userpic={user.userpic} />
            </span>
            <span className="comment__username comment__username--bold">
              {user.name} {}
            </span>
          </a>
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
};

export default EntryTlogComment;
