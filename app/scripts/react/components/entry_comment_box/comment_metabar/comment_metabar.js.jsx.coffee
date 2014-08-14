###* @jsx React.DOM ###

window.EntryCommentBox_CommentMetaBar = React.createClass

  propTypes:
    comment: React.PropTypes.object.isRequired
    entryId: React.PropTypes.number.isRequired

  render: ->
   `<span className="comment__meta">
      <EntryCommentBox_CommentMetaBarReply name={ this.props.comment.user.name }
                                           entryId={ this.props.entryId } />
      <span className="comment__dot">·</span>
      <EntryCommentBox_CommentMetaBarDate commentId={ this.props.comment.id }
                                          time={ this.props.comment.created_at } />
      <span className="comment__dot">·</span>
      <EntryCommentBox_CommentMetaBarDropdownMenu />
    </span>`