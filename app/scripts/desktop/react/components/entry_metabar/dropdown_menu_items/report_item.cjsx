window.EntryMetabarDropdownMenuReportItem = React.createClass
  mixins: [RequesterMixin]

  propTypes:
    entryId: React.PropTypes.number.isRequired

  render: ->
    <a onClick={ this.onClick }
        className="meta-item__dropdown-item">
      <i className="icon icon--exclamation-mark"></i>
      { i18n.t('report_entry_item') }
    </a>

  onClick: (e) ->
    e.stopPropagation()
    e.preventDefault()

    TastyConfirmController.show
      message:          i18n.t 'report_entry_confirm'
      acceptButtonText: i18n.t 'report_entry_button'
      onAccept:         @createReport

  createReport: ->
    @createRequest
      url: ApiRoutes.report_url @props.entryId
      method: 'POST'
      success: => NoticeService.notifySuccess i18n.t 'report_entry_success'
      error:   (data) -> NoticeService.errorResponse data