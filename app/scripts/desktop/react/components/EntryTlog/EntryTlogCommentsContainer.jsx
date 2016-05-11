/*global $, i18n */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadComments } from '../../actions/CommentsActions';
import { deleteComment, postComment, reportComment, updateComment } from '../../actions/CommentActions';
import EntryTlogComments from './EntryTlogComments';
import TastyConfirmController from '../../controllers/TastyConfirmController';
import NoticeService from '../../services/Notice';

const LOAD_COMMENTS_LIMIT = 50;

class EntryTlogCommentsContainer extends Component {
  startComment() {
    this.refs.main.startComment();
  }
  postComment(text) {
    const { entry: { id }, postComment } = this.props;

    return postComment(id, text)
      .then(() => {
        if (window.ga) {
          window.ga('send', 'event', 'UX', 'Comment');
        }
        $(document).trigger('domChanged');
      });

    // TODO: restore post auth logic
  }
  reportComment(id) {
    TastyConfirmController.show({
      message: i18n.t('report_comment_confirm'),
      acceptButtonText: i18n.t('report_comment_button'),
      onAccept: () => this.props.reportComment(id)
        .then(() => NoticeService.notifySuccess(i18n.t('report_comment_success'))),
    });
  }
  updateComment(id, text) {
    return this.props.updateComment(id, text);
  }
  deleteComment(id) {
    TastyConfirmController.show({
      message: i18n.t('delete_comment_confirm'),
      acceptButtonText: i18n.t('delete_comment_button'),
      onAccept: () => this.props.deleteComment(id)
        .then(() => NoticeService.notifySuccess(i18n.t('delete_comment_success'))),
    });
  }
  loadMore() {
    const { comments: [ firstComment ], entry: { id }, limit, loadComments } = this.props;

    loadComments({ entryId: id, toCommentId: firstComment && firstComment.id, limit });
  }
  render() {
    const { commentator, comments, entry, entryState, isFormHidden, limit } = this.props;

    return (
      <EntryTlogComments
        commentator={commentator}
        comments={comments}
        commentsCount={entry.commentsCount}
        deleteComment={this.deleteComment.bind(this)}
        entryId={entry.id}
        entryUrl={entry.url}
        isFormHidden={!!isFormHidden}
        limit={limit}
        loadMore={this.loadMore.bind(this)}
        loading={!!entryState.isLoadingComments}
        postComment={this.postComment.bind(this)}
        posting={!!entryState.isPostingComment}
        ref="main"
        reportComment={this.reportComment.bind(this)}
        updateComment={this.updateComment.bind(this)}
      />
    );
  }
}

EntryTlogCommentsContainer.propTypes = {
  commentator: PropTypes.object.isRequired,
  comments: PropTypes.array.isRequired,
  deleteComment: PropTypes.func.isRequired,
  entry: PropTypes.object.isRequired,
  entryState: PropTypes.object.isRequired,
  isFormHidden: PropTypes.bool,
  limit: PropTypes.number,
  loadComments: PropTypes.func.isRequired,
  postComment: PropTypes.func.isRequired,
  reportComment: PropTypes.func.isRequired,
  updateComment: PropTypes.func.isRequired,
};

EntryTlogCommentsContainer.defaultProps = {
  limit: LOAD_COMMENTS_LIMIT,
};

export default connect(
  (state, { commentator, entry, isFormHidden, limit }) => {
    const { entities: { comment, tlog }, entryComments,
            entryState: entryStateStore, commentState: commentStateStore } = state;
    const comments = Object.keys(comment)
            .filter((id) => comment[id].entryId === entry.id)
            .map((id) => {
              const c = comment[id];
              const commentState = commentStateStore[id];

              return Object.assign({}, c, commentState, { user: tlog[c.user] });
            })
            .sort((a, b) => (new Date(a.createdAt)).valueOf() - (new Date(b.createdAt)).valueOf());
    const entryState = entryStateStore[entry.id] || {};

    return {
      commentator,
      comments,
      entry,
      entryState,
      isFormHidden,
      limit,
    };
  },
  {
    deleteComment,
    loadComments,
    postComment,
    reportComment,
    updateComment,
  }
)(EntryTlogCommentsContainer);
