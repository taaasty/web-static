###* @jsx React.DOM ###

window.EntryCommentBox_CommentMetaBarDropdownMenuLinkItem = React.createClass

  propTypes:
    commentId: React.PropTypes.number.isRequired

  render: ->
   `<a className="comment__dropdown-item" href={ '#comment-' + this.props.commentId } title="Ссылка на комментарий">
      <i className="icon icon--hyperlink" />
      Ссылка на комментарий
    </a>`