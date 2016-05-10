import React, { Component, PropTypes } from 'react';
import EntryTlogCommentCreateForm from './EntryTlogCommentCreateForm';
import EntryTlogCommentList from './EntryTlogCommentList';
import EntryTlogCommentsLoadMore from './EntryTlogCommentsLoadMore';

class EntryTlogComments extends Component {
  render() {
    const { commentator, comments, commentsCount, deleteComment, isFormHidden,
            entryId, entryUrl, limit, loadMore, loading, postComment, posting,
            replyComment, reportComment, updateComment } = this.props;

    return (
      <section className="comments">
        {(commentsCount > comments.length) &&
         <EntryTlogCommentsLoadMore 
           limit={limit}
           loadedCount={comments.length}
           loading={loading}
           onLoadMore={loadMore}
           totalCount={commentsCount}
         />}
        {!!comments.length &&
         <EntryTlogCommentList
           commentator={commentator}
           comments={comments}
           entryId={entryId}
           entryUrl={entryUrl}
           onCommentDelete={deleteComment}
           onCommentReply={replyComment}
           onCommentReport={reportComment}
           onCommentUpdate={updateComment}
         />}
        <EntryTlogCommentCreateForm {...this.props}
          isFormHidden={isFormHidden}
          onCommentCreate={postComment}
          process={posting}
          ref="createForm"
          totalCommentsCount={commentsCount}
        />
      </section>
    );
  }
}

EntryTlogComments.propTypes = {
  commentator: PropTypes.object,
  comments: PropTypes.array.isRequired,
  commentsCount: PropTypes.number.isRequired,
  deleteComment: PropTypes.func.isRequired,
  entryId: PropTypes.number.isRequired,
  entryUrl: PropTypes.string.isRequired,
  isFormHidden: PropTypes.bool,
  limit: PropTypes.number.isRequired,
  loadMore: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  postComment: PropTypes.func.isRequired,
  posting: PropTypes.bool.isRequired,
  replyComment: PropTypes.func.isRequired,
  reportComment: PropTypes.func.isRequired,
  updateComment: PropTypes.func.isRequired,
};

export default EntryTlogComments;
