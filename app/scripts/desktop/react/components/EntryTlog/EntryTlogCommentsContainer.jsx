/*global i18n */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import PostAuthService from '../../services/PostAuthService';
import TastyConfirmController from '../../controllers/TastyConfirmController';

const LOAD_COMMENTS_LIMIT = 50;

class EntryTlogCommentsContainer extends Component {
  postComment(text) {
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
    return (
        <EntryTlogComments
        />;
    );
  }
}

EntryTlogCommentsContainer.propTypes = {
  entry: PropTypes.object.isRequired,
  isFormHidden: 
};

export default EntryTlogCommentsContainer;
