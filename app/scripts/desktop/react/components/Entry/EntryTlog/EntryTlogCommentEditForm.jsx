import React, { PropTypes } from 'react';
import EntryTlogCommentForm from './EntryTlogCommentForm';

export default class EntryTlogCommentEditForm {
  static propTypes = {
    comment: PropTypes.object.isRequired,
    commentator: PropTypes.object.isRequired,
    process: PropTypes.bool
  }
  render() {
    return (
      <EntryTlogCommentForm
          text={this.props.comment.comment_html}
          commentator={this.props.commentator}
          process={this.props.process}
          onSubmit={this.props.onCommentUpdate}
          onCancel={this.props.onCancel} />
    );
  }
}