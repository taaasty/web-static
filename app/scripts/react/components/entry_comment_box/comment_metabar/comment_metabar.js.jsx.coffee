###* @jsx React.DOM ###

window.EntryCommentBox_CommentMetaBar = React.createClass

  propTypes:
    comment: React.PropTypes.object.isRequired

  render: ->
   `<span className="comment__meta">
      <EntryCommentBox_CommentMetaBarReply />
      <span className="comment__dot">·</span>
      <EntryCommentBox_CommentMetaBarDate />
      <span className="comment__dot">·</span>
      <EntryCommentBox_CommentMetaBarDropdownMenu />
    </span>`