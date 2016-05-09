/*global $, i18n */
import React, { Component, PropTypes } from 'react';
import EntryActionCreators from '../../actions/Entry';
import EntryTlogCommentCreateForm from './EntryTlogCommentCreateForm';
import EntryTlogCommentList from './EntryTlogCommentList';
import EntryTlogCommentsLoadMore from './EntryTlogCommentsLoadMore';
import PostAuthService from '../../services/PostAuthService';
import TastyConfirmController from '../../controllers/TastyConfirmController';

const LOAD_COMMENTS_LIMIT = 50;

class EntryTlogComments extends Component {
  renderLoadMoreButton() {
    const { entry: { comments, commentsCount }, limit } = this.props;

    return (
      <EntryTlogCommentsLoadMore 
        limit={limit}
        loadedCount={comments.length}
        loading={this.state.loadingMore}
        onLoadMore={this.loadMore.bind(this)}
        totalCount={commentsCount}
      />
    );
  }
  renderCommentList() {
    const { commentator, entry: { comments, id, url }, isFeed } = this.props;

    return (
      <EntryTlogCommentList
        commentator={commentator}
        comments={comments}
        entryId={id}
        entryUrl={url}
        isFeed={isFeed}
        onCommentDelete={this.deleteComment.bind(this)}
        onCommentReply={this.replyComment.bind(this)}
        onCommentReport={this.reportComment.bind(this)}
        onCommentUpdate={this.updateComment.bind(this)}
      />
    );
  }
  renderCommentForm() {
    return (
      <EntryTlogCommentCreateForm {...this.props}
        entryID={this.props.entry.id}
        hideCommentForm={this.props.hideCommentForm}
        onCommentCreate={this.createComment.bind(this)}
        process={this.state.processCreate}
        ref="createForm"
        totalCommentsCount={this.state.totalCount}
      />
    );
  }
  createComment(text) {
    const { id } = this.props.entry;

    PostAuthService.run(
      'comment',
      () => {
        postComment(id, text)
          .then(() => {
            if (window.ga) {
              window.ga('send', 'event', 'UX', 'Comment');
            }
            $(document).trigger('domChanged');
            this.refs.createForm.clear();
          });
      },
      id,
      text
    );
  }
  replyComment(username) {
    this.refs.createForm.reply(username);
  }
  startComment() {
    this.refs.createForm.open();
  }
  reportComment(commentId) {
    TastyConfirmController.show({
      message: i18n.t('report_comment_confirm'),
      acceptButtonText: i18n.t('report_comment_button'),
      onAccept: () => {
        EntryActionCreators.reportComment(commentId);
      },
    });
  }
  updateComment(commentId, text) {
    EntryActionCreators.editComment(commentId, text);
  }
  deleteComment(commentId) {
    TastyConfirmController.show({
      message: i18n.t('delete_comment_confirm'),
      acceptButtonText: i18n.t('delete_comment_button'),
      onAccept: () => {
        EntryActionCreators.deleteComment(commentId)
      },
    });
  }
  loadMore() {
    
    const toCommentID = this.state.comments[0] ? this.state.comments[0].id : null;

    EntryActionCreators.loadComments(this.props.entry.id, toCommentID, this.props.limit);
  }
  render() {
    const { comments, commentsCount } = this.props;

    return (
      <section className="comments">
        {(totalCount > comments.length) && this.renderLoadMoreButton()}
        {!!comments.length && this.renderCommentList()}
        {this.renderCommentForm()}
      </section>
    );
  }
}

EntryTlogComments.propTypes = {
  commentator: PropTypes.object,
  entry: PropTypes.object.isRequired,
  hideCommentForm: PropTypes.bool,
  isFeed: PropTypes.bool,
  limit: PropTypes.number,
};

EntryTlogComments.defaultProps = {
  limit: LOAD_COMMENTS_LIMIT,
};

export default EntryTlogComments;
