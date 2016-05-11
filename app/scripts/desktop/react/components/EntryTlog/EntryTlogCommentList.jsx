import React, { PropTypes } from 'react';
import EntryTlogCommentContainer from './EntryTlogCommentContainer';

function EntryTlogCommentList(props) {
  const { commentator, comments, entryId, entryUrl, onCommentReply,
          onCommentUpdate, onCommentReport, onCommentDelete } = props;

  return (
      <div className="comments__list">{
        comments.map((comment) => (
          <EntryTlogCommentContainer
            comment={comment}
            commentator={commentator}
            entryId={entryId}
            entryUrl={entryUrl}
            key={comment.id}
            onCommentDelete={onCommentDelete.bind(null, comment.id)}
            onCommentReply={onCommentReply.bind(null, comment.user.name)}
            onCommentReport={onCommentReport.bind(null, comment.id)}
            onCommentUpdate={onCommentUpdate.bind(null, comment.id)}
          />
        ))
      }
    </div>
  );
}

EntryTlogCommentList.propTypes = {
  commentator: PropTypes.object,
  comments: PropTypes.array.isRequired,
  entryId: PropTypes.number.isRequired,
  entryUrl: PropTypes.string.isRequired,
  onCommentDelete: PropTypes.func.isRequired,
  onCommentReply: PropTypes.func.isRequired,
  onCommentReport: PropTypes.func.isRequired,
  onCommentUpdate: PropTypes.func.isRequired,
};

export default EntryTlogCommentList;
