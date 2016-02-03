/*global i18n */
import React, { PropTypes } from 'react';
import EntryTlogCommentMetabarDate from './EntryTlogCommentMetabarDate';
import EntryTlogCommentMetabarActions from './EntryTlogCommentMetabarActions';

function EntryTlogCommentMetabar(props) {
  function renderReply() {
    return (
      <span>
        <span className="comment__reply" onClick={props.onCommentReply}>
          {i18n.t('comment_reply')}
        </span>
        <span className="comment__dot">·</span>
      </span>
    );
  }

  const { comment: { created_at, id }, commentator, entryId, entryUrl } = props;
  const commentUrl = `${entryUrl}#comment-${id}`;

  return (
    <span className="comment__meta">
      {commentator && renderReply()}
      <EntryTlogCommentMetabarDate
        date={created_at}
        entryId={entryId}
        url={commentUrl}
      />
      <span className="comment__dot">·</span>
      <EntryTlogCommentMetabarActions {...props} url={commentUrl} />
    </span>
  );
}

EntryTlogCommentMetabar.propTypes = {
  comment: PropTypes.object.isRequired,
  commentator: PropTypes.object,
  entryUrl: PropTypes.string.isRequired,
  onCommentReply: PropTypes.func,
};

export default EntryTlogCommentMetabar;
