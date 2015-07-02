import React, { Component, PropTypes } from 'react';
import EntryActionCreators from '../../../actions/Entry';
import EntryTlogCommentCreateForm from './EntryTlogCommentCreateForm';
import EntryTlogCommentList from './EntryTlogCommentList';
import EntryTlogCommentsLoadMore from './EntryTlogCommentsLoadMore';

const LOAD_COMMENTS_LIMIT = 50;

export default class EntryTlogComments extends Component {
  static propTypes = {
    entry: PropTypes.object.isRequired,
    commentator: PropTypes.object,
    limit: PropTypes.number
  }
  static defaultProps = {
    limit: LOAD_COMMENTS_LIMIT
  }
  state = {
    comments: this.props.entry.comments || [],
    totalCount: this.props.entry.comments_count,
    processCreate: false,
    loadingMore: false
  }
  render() {
    return (
      <section className="comments">
        {::this.renderLoadMoreButton()}
        {this.renderCommentList()}
        {this.renderCommentForm()}
      </section>
    );
  }
  renderLoadMoreButton() {
    if (this.state.totalCount > this.state.comments.length) {
      return (
        <EntryTlogCommentsLoadMore 
            totalCount={this.state.totalCount}
            loadedCount={this.state.comments.length}
            limit={this.props.limit}
            loading={this.state.loadingMore}
            onLoadMore={::this.loadMore} />
      );
    }
  }
  renderCommentList() {
    if (this.state.comments.length) {
      let actions = {
        onCommentReport: ::this.reportComment,
        onCommentDelete: ::this.deleteComment,
        onCommentUpdate: ::this.updateComment,
        onCommentReply: ::this.replyComment
      };
      return (
        <EntryTlogCommentList {...actions}
            comments={this.state.comments}
            commentator={this.props.commentator}
            entryUrl={this.props.entry.url} />
      );
    }
  }
  renderCommentForm() {
    if (this.props.commentator) {
      const actions = {
        onCommentCreate: ::this.createComment
      };

      return (
        <EntryTlogCommentCreateForm {...this.props} {...actions}
            ref="createForm"
            entryID={this.props.entry.id}
            totalCommentsCount={this.state.totalCount}
            process={this.state.processCreate} />
      );
    }
  }
  createComment(text) {
    this.setState({ processCreate: true });

    EntryActionCreators.createComment(this.props.entry.id, text)
      .then((comment) => {
        this.setState({
          comments: this.state.comments.concat(comment),
          totalCount: this.state.totalCount + 1
        }, () => {
          $(document).trigger('domChanged');
        });
        this.refs.createForm.clear();
      })
      .always(() => {
        this.setState({ processCreate: false });
      });
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
          totalCount: data.total_count
        }, () => {
          $(document).trigger('domChanged');
        });
      })
      .always(() => {
        this.setState({ loadingMore: false });
      });
  }
}