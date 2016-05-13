/*global $, i18n */
import React, { Component, PropTypes, shallowEqual } from 'react';
import { connect } from 'react-redux';
import { loadComments } from '../../actions/CommentsActions';
import { deleteComment, postComment, reportComment, updateComment } from '../../actions/CommentActions';
import EntryTlogComments from './EntryTlogComments';
import TastyConfirmController from '../../controllers/TastyConfirmController';
import NoticeService from '../../services/Notice';

const LOAD_COMMENTS_LIMIT = 50;

class EntryTlogCommentsContainer extends Component {
  shouldComponentUpdate(nextProps) {
    const { commentator, comments, commentStates, entry, isFormHidden, users } = this.props;
    const { commentator: nextCommentator, comments: nextComments, commentStates: nextCommentStates,
            entry: nextEntry, isFormHidden: nextIsFormHidden, users: nextUsers } = nextProps;

    return commentator !== nextCommentator ||
      !shallowEqual(comments, nextComments) ||
      !shallowEqual(commentStates, nextCommentStates) ||
      entry !== nextEntry ||
      isFormHidden !== nextIsFormHidden ||
      !shallowEqual(users, nextUsers);
  }
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
  loadMore(entryId, toCommentId) {
    const { limit, loadComments } = this.props;

    loadComments({ entryId, toCommentId, limit });
  }
  render() {
    console.count('tlogComments');
    const { commentator, comments: rawComments, commentStates, entry, isFormHidden, limit, users } = this.props;
    const comments = Object.keys(rawComments)
            .map((id) =>  Object.assign({}, rawComments[id], commentStates[id], { user: users[id] }))
            .sort((a, b) => (new Date(a.createdAt)).valueOf() - (new Date(b.createdAt)).valueOf());
    const [ firstComment ] = comments;

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
        loadMore={this.loadMore.bind(this, entry.id, (firstComment && firstComment.id))}
        loading={!!entry.isLoadingComments}
        postComment={this.postComment.bind(this)}
        posting={!!entry.isPostingComment}
        ref="main"
        reportComment={this.reportComment.bind(this)}
        updateComment={this.updateComment.bind(this)}
      />
    );
  }
}

EntryTlogCommentsContainer.propTypes = {
  commentator: PropTypes.object.isRequired,
  comments: PropTypes.object.isRequired,
  commentStates: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
  entry: PropTypes.object.isRequired,
  isFormHidden: PropTypes.bool,
  limit: PropTypes.number,
  loadComments: PropTypes.func.isRequired,
  postComment: PropTypes.func.isRequired,
  reportComment: PropTypes.func.isRequired,
  updateComment: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired,
};

EntryTlogCommentsContainer.defaultProps = {
  limit: LOAD_COMMENTS_LIMIT,
};

export default connect(
  (state, { commentator, entry, isFormHidden, limit }) => {
    const { entities: { comment, tlog }, commentState: commentStateStore } = state;
    const comments = Object.keys(comment)
            .filter((id) => comment[id].entryId === entry.id)
            .map((id) => comment[id])
            .reduce((acc, c) => (acc[c.id] = c, acc), {});
    const commentStates = Object.keys(comments).reduce((acc, id) => (acc[id] = commentStateStore[id], acc), {});
    const users = Object.keys(comments).reduce((acc, id) => (acc[id] = tlog[comments[id].user], acc), {});

    return {
      commentator,
      comments,
      commentStates,
      users,
      entry,
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
  },
  null,
  { withRef: true }
)(EntryTlogCommentsContainer);
