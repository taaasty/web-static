#TODO: i18n
TITLE = 'Пожаловаться'

window.HeroProfile_DropdownMenuReportItem = React.createClass
  mixins: [RequesterMixin]

  propTypes:
    userId:       React.PropTypes.number.isRequired
    onRequestEnd: React.PropTypes.func.isRequired

  render: ->
    <a className="action-dropdown-item"
       onClick={ this.report }>
      <i className="icon icon--exclamation-mark" />
      { TITLE }
    </a>

  report: ->
    @createRequest(
      url: ApiRoutes.tlog_report @props.userId
      method: 'POST'
      success: ->
        TastyNotifyController.notify 'success', 'Жалоба на пользователя принята, и будет рассмотрена в ближайшее время'
        @props.onRequestEnd()
      error: (data) ->
        TastyNotifyController.errorResponse data
    , { progressBar: true })