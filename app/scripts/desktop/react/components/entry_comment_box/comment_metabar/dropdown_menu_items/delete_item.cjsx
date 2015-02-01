window.EntryCommentBox_CommentMetaBarDropdownMenuDeleteItem = React.createClass
  mixins: [RequesterMixin]

  propTypes:
    commentId: React.PropTypes.number.isRequired
    onDelete:  React.PropTypes.func

  render: ->
    <a onClick={ this.onClick }
       title={ i18n.t('delete_comment_item') }
       className="comment__dropdown-item">
      <i className="icon icon--basket" />
      { i18n.t('delete_comment_item') }
    </a>

  onClick: (e) ->
    e.stopPropagation()
    e.preventDefault()

    TastyConfirmController.show
      message:          i18n.t 'delete_comment_confirm'
      acceptButtonText: i18n.t 'delete_comment_button'
      onAccept:         @deleteComment

  deleteComment: ->
    @createRequest
      url: ApiRoutes.comments_edit_delete_url @props.commentId
      method: 'POST'
      data:
        _method: 'DELETE'
      success: =>
        TastyNotifyController.notifySuccess i18n.t 'delete_comment_success'
        @props.onDelete() if @props.onDelete?
      error: (data) -> TastyNotifyController.errorResponse data