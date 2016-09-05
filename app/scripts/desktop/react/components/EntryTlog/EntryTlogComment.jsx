import React, { PropTypes } from 'react';
import Avatar from '../../../../shared/react/components/common/AvatarCamelCase';
import Spinner from '../../../../shared/react/components/common/Spinner';
import EntryTlogCommentMetabar from './EntryTlogCommentMetabar';
import UserSlug from '../UserSlug';
import { Link } from 'react-router';
import uri from 'urijs';

export const COMMENT_AVATAR_SIZE = 40;

function EntryTlogComment(props) {
  const { comment, commentState, commentUser } = props;

  return (
    <article className="comment">
      <div className="comment__table">
        <div className="comment__table-cell">
          <Link
            className="comment__user"
            title={commentUser.get('name')}
            to={uri(commentUser.get('tlogUrl')).path()}
          >
            <span className="comment__avatar">
              {commentState.get('isProcessing', false)
               ? <Spinner size={30} />
               : <Avatar size={COMMENT_AVATAR_SIZE} userpic={commentUser.get('userpic').toJS()} />
              }
            </span>
            <span className="comment__username comment__username--bold">
              <UserSlug showAsStar user={commentUser} />
              {' '}
            </span>
          </Link>
          <span dangerouslySetInnerHTML={{__html: comment.get('commentHtml', '')}} />
          <EntryTlogCommentMetabar {...props} />
        </div>
      </div>
    </article>
  );
}

EntryTlogComment.propTypes = {
  comment: PropTypes.object.isRequired,
  commentState: PropTypes.object.isRequired,
  commentUser: PropTypes.object.isRequired,
  entryUrl: PropTypes.string.isRequired,
};

export default EntryTlogComment;
