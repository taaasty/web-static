window.EntryCommentBox_CommentMetaBarDropdownMenuDeleteItem = React.createClass
  mixins: [RequesterMixin]

  propTypes:
    commentId: React.PropTypes.number.isRequired
    onDelete:  React.PropTypes.func

  render: ->
    <a onClick={ this.onClick }
       title="Удалить комментарий"
       className="comment__dropdown-item">
      <i className="icon icon--basket" />
      Удалить комментарий
    </a>

  onClick: (e) ->
    e.stopPropagation()
    e.preventDefault()

    TastyConfirmController.show
      message:          'Вы действительно хотите удалить комментарий?<br />Его нельзя будет восстановить.'
      acceptButtonText: 'Удалить комментарий'
      onAccept:         @deleteComment

  deleteComment: ->
    @createRequest
      url: ApiRoutes.comments_edit_delete_url @props.commentId
      method: 'POST'
      data:
        _method: 'DELETE'
      success: =>
        TastyNotifyController.notify 'success', 'Комментарий успешно удалён'
        @props.onDelete() if @props.onDelete?
      error: (data) -> TastyNotifyController.errorResponse data