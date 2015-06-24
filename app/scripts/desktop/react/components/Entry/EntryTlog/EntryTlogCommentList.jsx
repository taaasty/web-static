import React, { PropTypes } from 'react';
import EntryTlogCommentContainer from './EntryTlogCommentContainer';

export default class EntryTlogCommentList {
  static propTypes = {
    comments: PropTypes.array.isRequired,
    entryUrl: PropTypes.string.isRequired
  }
  render() {
    let commentList = this.props.comments.map((comment) => (
      <EntryTlogCommentContainer
          comment={comment}
          entryUrl={this.props.entryUrl}
          onCommentReply={this.props.onCommentReply.bind(null, comment.user.name)}
          key={comment.id} />
    ));

    return (
      <div className="comments__list">{commentList}</div>
    );
  }
}