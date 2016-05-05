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
  state = this.initState(this.props);
  componentWillReceiveProps(nextProps) {
    if (this.props.entry.id !== nextProps.entry.id) {
      this.setState(this.initState(nextProps));
    }
  }
  initState(props) {
    return {
      comments: props.entry.comments || [],
      totalCount: props.entry.commentsCount,
      processCreate: false,
      loadingMore: false,
    };
  }
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
    const { commentator, entry: { id, url }, isFeed } = this.props;

    if (this.state.comments.length) {
      return (
        <EntryTlogCommentList
          commentator={commentator}
          comments={this.state.comments}
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
    EntryActionCreators.editComment(commentId, text)
      .then((comment) => {
        for (let i = 0; i < this.state.comments.length; i++) {
          if (this.state.comments[i].id === commentId) {
            this.state.comments.splice(i, 1, comment);
            break;
          }
        }
      })
      .always(() => {
        this.forceUpdate();
      });
  }
  deleteComment(commentId) {
    TastyConfirmController.show({
      message: i18n.t('delete_comment_confirm'),
      acceptButtonText: i18n.t('delete_comment_button'),
      onAccept: () => {
        EntryActionCreators.deleteComment(commentId)
          .then(() => {
            const newComments = this.state.comments.filter((comment) => (
              comment.id !== commentId
            ));

            this.setState({
              comments: newComments,
              totalCount: this.state.totalCount - 1
            });
          });
      },
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
          totalCount: data.totalCount,
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
  isFeed: PropTypes.bool,
  limit: PropTypes.number,
};

EntryTlogComments.defaultProps = {
  limit: LOAD_COMMENTS_LIMIT,
};

export default EntryTlogComments;
