import React, { Component, PropTypes } from 'react';
import EntryActionCreators from '../../../actions/Entry';
import EntryTlogCommentCreateForm from './EntryTlogCommentCreateForm';
import EntryTlogCommentList from './EntryTlogCommentList';
import EntryTlogCommentsLoadMore from './EntryTlogCommentsLoadMore';
import PostAuthService from '../../../services/PostAuthService';

const LOAD_COMMENTS_LIMIT = 50;

class EntryTlogComments extends Component {
  state = {
    comments: this.props.entry.comments || [],
    totalCount: this.props.entry.comments_count,
    processCreate: false,
    loadingMore: false,
  };
  renderLoadMoreButton() {
    if (this.state.totalCount > this.state.comments.length) {
      return (
        <EntryTlogCommentsLoadMore 
          limit={this.props.limit}
          loadedCount={this.state.comments.length}
          loading={this.state.loadingMore}
          onLoadMore={this.loadMore.bind(this)}
          totalCount={this.state.totalCount}
        />
      );
    }
  }
  renderCommentList() {
    if (this.state.comments.length) {
      return (
        <EntryTlogCommentList
          commentator={this.props.commentator}
          comments={this.state.comments}
          entryUrl={this.props.entry.url}
          onCommentDelete={this.deleteComment.bind(this)}
          onCommentReply={this.replyComment.bind(this)}
          onCommentReport={this.reportComment.bind(this)}
          onCommentUpdate={this.updateComment.bind(this)}
        />
      );
    }
  }
  renderCommentForm() {
    return (
      <EntryTlogCommentCreateForm {...this.props}
        ref="createForm"
        entryID={this.props.entry.id}
        hideCommentForm={this.props.hideCommentForm}
        onCommentCreate={this.createComment.bind(this)}
        totalCommentsCount={this.state.totalCount}
        process={this.state.processCreate}
      />
    );
  }
  createComment(text) {
    const { id } = this.props.entry;

    PostAuthService.run(
      'comment',
      () => {
        this.setState({ processCreate: true });
        EntryActionCreators.createComment(id, text)
          .then((comment) => {
            if (window.ga) {
              window.ga('send', 'event', 'UX', 'Comment');
            }
            this.setState({
              comments: this.state.comments.concat(comment),
              totalCount: this.state.totalCount + 1,
            }, () => {
              $(document).trigger('domChanged');
            });
            this.refs.createForm.clear();
          })
          .always(() => {
            this.setState({ processCreate: false });
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
  reportComment(commentID) {
    TastyConfirmController.show({
      message: i18n.t('report_comment_confirm'),
      acceptButtonText: i18n.t('report_comment_button'),
      onAccept: () => {
        EntryActionCreators.reportComment(commentID);
      }
    });
  }
  updateComment(commentID, text) {
    EntryActionCreators.editComment(commentID, text)
      .then((comment) => {
        for (let i = 0; i < this.state.comments.length; i++) {
          if (this.state.comments[i].id === commentID) {
            this.state.comments.splice(i, 1, comment);
            break;
          }
        }
      })
      .always(() => {
        this.forceUpdate();
      });
  }
  deleteComment(commentID) {
    TastyConfirmController.show({
      message: i18n.t('delete_comment_confirm'),
      acceptButtonText: i18n.t('delete_comment_button'),
      onAccept: () => {
        EntryActionCreators.deleteComment(commentID)
          .then(() => {
            const newComments = this.state.comments.filter((comment) => (
              comment.id !== commentID
            ));

            this.setState({
              comments: newComments,
              totalCount: this.state.totalCount - 1
            });
          });
      }
    });
  }
  loadMore() {
    const toCommentID = this.state.comments[0] ? this.state.comments[0].id : null;

    this.setState({ loadingMore: true });
    EntryActionCreators.loadComments(this.props.entry.id, toCommentID, this.props.limit)
      .then((data) => {
        let newComments = data.comments.concat(this.state.comments);
        this.setState({
          comments: data.comments.concat(this.state.comments),
          totalCount: data.total_count,
        }, () => {
          $(document).trigger('domChanged');
        });
      })
      .always(() => {
        this.setState({ loadingMore: false });
      });
  }
  render() {
    return (
      <section className="comments">
        {this.renderLoadMoreButton()}
        {this.renderCommentList()}
        {this.renderCommentForm()}
      </section>
    );
  }
}

EntryTlogComments.propTypes = {
  commentator: PropTypes.object,
  entry: PropTypes.object.isRequired,
  hideCommentForm: PropTypes.bool,
  limit: PropTypes.number,
};

EntryTlogComments.defaultProps = {
  limit: LOAD_COMMENTS_LIMIT,
};

export default EntryTlogComments;
