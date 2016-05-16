import React, { Component, PropTypes } from 'react';
import EntryTlogCommentCreateForm from './EntryTlogCommentCreateForm';
import EntryTlogCommentList from './EntryTlogCommentList';
import EntryTlogCommentsLoadMore from './EntryTlogCommentsLoadMore';

class EntryTlogComments extends Component {
  replyComment(username) {
    this.refs.createForm.reply(username);
  }
  startComment() {
    this.refs.createForm.open();
  }
  postComment(text) {
    this.props.postComment(text)
      .then(() => this.refs.createForm.clear());
  }
  render() {
    const { commentStates, commentUsers, commentator, comments, commentsCount, deleteComment,
            isFormHidden, entryId, entryUrl, limit, loadMore, loading, posting, reportComment,
            updateComment } = this.props;

    return (
      <section className="comments">
        {(commentsCount > comments.size) &&
         <EntryTlogCommentsLoadMore 
           limit={limit}
           loadedCount={comments.size}
           loading={loading}
           onLoadMore={loadMore}
           totalCount={commentsCount}
         />}
        {!!comments.size &&
         <EntryTlogCommentList
           commentStates={commentStates}
           commentUsers={commentUsers}
           commentator={commentator}
           comments={comments}
           entryId={entryId}
           entryUrl={entryUrl}
           onCommentDelete={deleteComment}
           onCommentReply={this.replyComment.bind(this)}
           onCommentReport={reportComment}
           onCommentUpdate={updateComment}
         />}
        <EntryTlogCommentCreateForm
          commentator={commentator}
          isFormHidden={isFormHidden}
          onCommentCreate={this.postComment.bind(this)}
          process={posting}
          ref="createForm"
          totalCommentsCount={commentsCount}
        />
      </section>
    );
  }
}

EntryTlogComments.propTypes = {
  commentStates: PropTypes.object.isRequired,
  commentUsers: PropTypes.object.isRequired,
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
  reportComment: PropTypes.func.isRequired,
  updateComment: PropTypes.func.isRequired,
};

export default EntryTlogComments;
