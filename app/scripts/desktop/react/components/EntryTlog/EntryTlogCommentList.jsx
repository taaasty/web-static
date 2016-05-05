import moment from 'moment';
import React, { PropTypes } from 'react';
import EntryTlogCommentContainer from './EntryTlogCommentContainer';

function EntryTlogCommentList({ commentator, comments, entryId, entryUrl, isFeed,
                                onCommentReply, onCommentUpdate,
                                onCommentReport, onCommentDelete }) {

  const orderedComments = comments.sort((a, b) => (
    moment(a.updatedAt).valueOf() - moment(b.updatedAt).valueOf()
  ));

  return (
      <div className="comments__list">{
        orderedComments.map((comment) => (
          <EntryTlogCommentContainer
            comment={comment}
            commentator={commentator}
            entryId={entryId}
            entryUrl={entryUrl}
            isFeed={isFeed}
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
  isFeed: PropTypes.bool,
};

export default EntryTlogCommentList;
