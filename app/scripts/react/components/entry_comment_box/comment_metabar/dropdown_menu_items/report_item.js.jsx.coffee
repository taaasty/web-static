###* @jsx React.DOM ###

window.EntryCommentBox_CommentMetaBarDropdownMenuReportItem = React.createClass
  mixins: [RequesterMixin]

  propTypes:
    commentId: React.PropTypes.number.isRequired

  render: ->
   `<a onClick={ this.onClick }
       title="Пожаловаться на комментарий"
       className="comment__dropdown-item">
      <i className="icon icon--exclamation-mark" />
      Пожаловаться на комментарий
    </a>`

  onClick: (e) ->
    e.stopPropagation()
    e.preventDefault()

    TastyConfirmController.show
      message:          'Вы действительно хотите пожаловаться на комментарий?'
      acceptButtonText: 'Пожаловаться'
      onAccept:         @createReport

  createReport: ->
    @createRequest
      url: ApiRoutes.comments_report_url @props.commentId
      method: 'POST'
      success: => TastyNotifyController.notify 'success', 'Жалоба на пост успешно отправлена'
      error: (data) -> TastyNotifyController.errorResponse data