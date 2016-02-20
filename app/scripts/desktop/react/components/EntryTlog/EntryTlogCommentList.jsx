import moment from 'moment';
import React, { PropTypes } from 'react';
import EntryTlogCommentContainer from './EntryTlogCommentContainer';

function EntryTlogCommentList({ commentator, comments, entryId, entryUrl,
                                onCommentReply, onCommentUpdate,
                                onCommentReport, onCommentDelete }) {

  const orderedComments = comments.sort((a, b) => (
    moment(a.updated_at).valueOf() - moment(b.updated_at).valueOf()
  ));

  return (
      <div className="comments__list">{
        orderedComments.map((comment) => (
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
};

export default EntryTlogCommentList;
