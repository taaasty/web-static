/*global $, i18n */
import React, { Component, PropTypes } from 'react';
import { Map } from 'immutable';
import { connect } from 'react-redux';
import { loadComments } from '../../actions/CommentsActions';
import { deleteComment, postComment, reportComment, updateComment } from '../../actions/CommentActions';
import EntryTlogComments from './EntryTlogComments';
import TastyConfirmController from '../../controllers/TastyConfirmController';
import NoticeService from '../../services/Notice';
import { onlyUpdateForKeys } from 'recompose';

const LOAD_COMMENTS_LIMIT = 50;

const emptyUser = Map();
const emptyCommentState = Map();

function shallowEqual(ImmA, ImmB) {
  return ImmA.isSubset(ImmB) && ImmB.isSubset(ImmA);
}

class EntryTlogCommentsContainer extends Component {
  shouldComponentUpdate(nextProps) {
    const {
      commentator,
      comments,
      commentStates,
      entry,
      isFormHidden,
      users,
    } = this.props;

    return commentator !== nextProps.commentator ||
      entry !== nextProps.entry ||
      isFormHidden !== nextProps.isFormHidden ||
      !shallowEqual(comments, nextProps.comments) ||
      !shallowEqual(commentStates, nextProps.commentStates) ||
      !shallowEqual(users, nextProps.users);
  }
  startComment() {
    this.refs.main.startComment();
  }
  postComment(text) {
    const { entry, postComment } = this.props;

    return postComment(entry.get('id'), text)
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
    const {
      commentator,
      comments,
      commentStates,
      entry,
      entryState,
      isFormHidden,
      limit,
      users,
    } = this.props;
    const entryUrl = entry.get('url', entry.get('entryUrl'));
    const entryId = entry.get('id');
    const sortedComments = comments.sortBy((c) => (new Date(c.get('createdAt'))).valueOf());
    const [ firstComment ] = comments; // TODO: check if works correctli

    return (
      <EntryTlogComments
        commentStates={commentStates}
        commentUsers={users}
        commentator={commentator}
        comments={sortedComments}
        commentsCount={entry.get('commentsCount')}
        deleteComment={this.deleteComment.bind(this)}
        entryId={entryId}
        entryUrl={entryUrl}
        isFormHidden={!!isFormHidden}
        limit={limit}
        loadMore={this.loadMore.bind(this, entryId, (firstComment && firstComment.id))}
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
  commentStates: PropTypes.object.isRequired,
  commentator: PropTypes.object.isRequired,
  comments: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
  entry: PropTypes.object.isRequired,
  entryState: PropTypes.object.isRequired,
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
    const { entities, commentState } = state;
    const comments = entities.get('comment').filter((c) => c.get('entryId') === entry.get('id'));
    const commentStates = comments.map((c) => commentState.get(c.get('id'), emptyCommentState));
    const users = comments.map((c) => entities.getIn([ 'tlog', String(c.get('user')) ], emptyUser));

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
// TODO: replace shouldComponentUpdate with onlyUpdateForKeys
/*
(onlyUpdateForKeys([
  'commentator',
  'comments',
  'commentStates',
  'entry',
  'isFormHidden',
  'users',
])(EntryTlogCommentsContainer));
*/
