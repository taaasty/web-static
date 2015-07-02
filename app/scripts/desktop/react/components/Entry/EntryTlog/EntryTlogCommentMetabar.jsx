import React, { PropTypes } from 'react';
import EntryTlogCommentMetabarDate from './EntryTlogCommentMetabarDate';
import EntryTlogCommentMetabarActions from './EntryTlogCommentMetabarActions';

export default class EntryTlogCommentMetabar {
  static propTypes = {
    comment: PropTypes.object.isRequired,
    commentator: PropTypes.object,
    entryUrl: PropTypes.string.isRequired
  }
  render() {
    return (
      <span className="comment__meta">
        {this.renderReply()}
        <EntryTlogCommentMetabarDate
            url={this.getCommentUrl()}
            date={this.props.comment.created_at} />
        <span className="comment__dot">·</span>
        <EntryTlogCommentMetabarActions {...this.props} url={this.getCommentUrl()} />
      </span>
    );
  }
  renderReply() {
    if (this.props.commentator) {
      return (
        <span>
          <span className="comment__reply" onClick={this.props.onCommentReply}>
            Ответить
          </span>
          <span className="comment__dot">·</span>
        </span>
      );
    }
  }
  getCommentUrl() {
    return this.props.entryUrl + '#comment-' + this.props.comment.id;
  }
}