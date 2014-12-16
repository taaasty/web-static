window.EntryCommentBox_CommentMetaBarDropdownMenuEditItem = React.createClass

  propTypes:
    entryId:   React.PropTypes.number.isRequired
    commentId: React.PropTypes.number.isRequired

  render: ->
    <a onClick={ this.onClick }
       title="Редактировать комментарий"
       className="comment__dropdown-item">
      <i className="icon icon--pencil" />
      Редактировать комментарий
    </a>

  onClick: ->
    window.commentsMediator.doEdit @props.entryId, @props.commentId