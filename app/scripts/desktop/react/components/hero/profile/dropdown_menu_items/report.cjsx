window.HeroProfile_DropdownMenuReportItem = React.createClass
  mixins: [RequesterMixin]

  propTypes:
    userId:       React.PropTypes.number.isRequired
    onRequestEnd: React.PropTypes.func.isRequired

  render: ->
    <a className="action-dropdown-item"
       onClick={ this.report }>
      <i className="icon icon--exclamation-mark" />
      { i18n.t('report_tlog_item') }
    </a>

  report: ->
    @createRequest(
      url: ApiRoutes.tlog_report @props.userId
      method: 'POST'
      success: ->
        TastyNotifyController.notifySuccess i18n.t 'report_user_success'
        @props.onRequestEnd()
      error: (data) ->
        TastyNotifyController.errorResponse data
    , { progressBar: true })