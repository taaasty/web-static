import React, { PropTypes } from 'react';
import EntryTlogCommentMetabarDate from './EntryTlogCommentMetabarDate';

export default class EntryTlogCommentMetabar {
  static propTypes = {
    comment: PropTypes.object.isRequired,
    entryUrl: PropTypes.string.isRequired
  }
  render() {
    return (
      <span className="comment__meta">
        <span className="comment__reply" onClick={this.props.onCommentReply}>
          Ответить
        </span>
        <span className="comment__dot">·</span>
        <EntryTlogCommentMetabarDate
            url={this.props.entryUrl + '#comment-' + this.props.comment.id}
            date={this.props.comment.created_at} />
      </span>
    );
  }
  // window.EntryCommentBox_CommentMetaBarReply = React.createClass

  // propTypes:
  //   name:    React.PropTypes.string.isRequired
  //   entryId: React.PropTypes.number.isRequired

  // render: ->
  //   <span className="comment__reply"
  //         onClick={ this.onClick }>
  //     Ответить
  //   </span>

  // onClick: ->
  //   window.commentsMediator.doReplyClicked @props.entryId, @props.name
  // render() {
  //   return (
  //     <span className="comment__meta">
  //       <span className="comment__reply" onClick={this.reply}>
  //         Ответить
  //       </span>
  //       <span className="comment__dot">·</span>
  //       <EntryTlogCommentMetabarDate
  //           url={this.props.entryUrl}
  //     <EntryCommentBox_CommentMetaBarDate entryUrl={ this.props.entryUrl }
  //                                         commentId={ this.props.commentId }
  //                                         time={ this.props.commentCreatedAt } />
  //     <span className="comment__dot">·</span>
  //     <EntryCommentBox_CommentMetaBarDropdownMenu commentId={ this.props.commentId }
  //                                                 entryId={ this.props.entryId }
  //                                                 entryUrl={ this.props.entryUrl }
  //                                                 canReport={ this.props.canReport }
  //                                                 canDelete={ this.props.canDelete }
  //                                                 canEdit={ this.props.canEdit }
  //                                                 onDelete={ this.props.onDelete } />
  //   </span>
  //   );
  // }
}