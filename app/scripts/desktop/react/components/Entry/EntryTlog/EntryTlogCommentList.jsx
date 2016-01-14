import React, { PropTypes } from 'react';
import EntryTlogCommentContainer from './EntryTlogCommentContainer';

export default class EntryTlogCommentList {
  static propTypes = {
    comments: PropTypes.array.isRequired,
    commentator: PropTypes.object,
    entryUrl: PropTypes.string.isRequired,
  };
  render() {
    let commentList = this.props.comments.map((comment) => (
      <EntryTlogCommentContainer
          comment={comment}
          commentator={this.props.commentator}
          entryUrl={this.props.entryUrl}
          onCommentReply={this.props.onCommentReply.bind(null, comment.user.name)}
          onCommentUpdate={this.props.onCommentUpdate.bind(null, comment.id)}
          onCommentReport={this.props.onCommentReport.bind(null, comment.id)}
          onCommentDelete={this.props.onCommentDelete.bind(null, comment.id)}
          key={comment.id} />
    ));

    return (
      <div className="comments__list">{commentList}</div>
    );
  }
}
