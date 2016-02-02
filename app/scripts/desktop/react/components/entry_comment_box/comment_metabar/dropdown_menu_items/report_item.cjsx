window.EntryCommentBox_CommentMetaBarDropdownMenuReportItem = React.createClass
  mixins: [RequesterMixin]

  propTypes:
    commentId: React.PropTypes.number.isRequired

  render: ->
    <a onClick={ this.onClick }
       title={ i18n.t('report_comment_item') }
       className="comment__dropdown-item">
      <i className="icon icon--exclamation-mark" />
      { i18n.t('report_comment_item') }
    </a>

  onClick: (e) ->
    e.stopPropagation()
    e.preventDefault()

    TastyConfirmController.show
      message:          i18n.t 'report_comment_confirm'
      acceptButtonText: i18n.t 'report_comment_button'
      onAccept:         @createReport

  createReport: ->
    @createRequest
      url: ApiRoutes.comments_report_url @props.commentId
      method: 'POST'
      success: => NoticeService.notifySuccess i18n.t 'report_comment_success'
      error: (data) -> NoticeService.errorResponse data