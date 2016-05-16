import React, { PropTypes } from 'react';
import { Map } from 'immutable';
import EntryTlogCommentContainer from './EntryTlogCommentContainer';

function EntryTlogCommentList(props) {
  const { commentStates, commentUsers, commentator, comments, entryId, entryUrl,
          onCommentReply, onCommentUpdate, onCommentReport, onCommentDelete } = props;

  return (
      <div className="comments__list">{
        comments.map((comment, key) => {
          const commentId = comment.get('id');
          const commentUserName = commentUsers.getIn([ key, 'name' ], '');

          return (
            <EntryTlogCommentContainer
              comment={comment}
              commentState={commentStates.get(key, Map())}
              commentUser={commentUsers.get(key, Map())}
              commentator={commentator}
              entryId={entryId}
              entryUrl={entryUrl}
              key={`tlog-entry-comment-${commentId}`}
              onCommentDelete={onCommentDelete.bind(null, commentId)}
              onCommentReply={onCommentReply.bind(null, commentUserName)}
              onCommentReport={onCommentReport.bind(null, commentId)}
              onCommentUpdate={onCommentUpdate.bind(null, commentId)}
            />
          );
        }).valueSeq()
      }
    </div>
  );
}

EntryTlogCommentList.propTypes = {
  commentStates: PropTypes.object.isRequired,
  commentUsers: PropTypes.object.isRequired,
  commentator: PropTypes.object,
  comments: PropTypes.object.isRequired,
  entryId: PropTypes.number.isRequired,
  entryUrl: PropTypes.string.isRequired,
  onCommentDelete: PropTypes.func.isRequired,
  onCommentReply: PropTypes.func.isRequired,
  onCommentReport: PropTypes.func.isRequired,
  onCommentUpdate: PropTypes.func.isRequired,
};

export default EntryTlogCommentList;
