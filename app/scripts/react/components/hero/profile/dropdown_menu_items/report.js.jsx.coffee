###* @jsx React.DOM ###

#TODO: i18n
TITLE = 'Пожаловаться'

window.HeroProfile_DropdownMenuReportItem = React.createClass
  mixins: [RequesterMixin]

  propTypes:
    userId:  React.PropTypes.number.isRequired
    onClick: React.PropTypes.func.isRequired

  render: ->
   `<a title={ TITLE }
       className="action-dropdown-item"
       onClick={ this.handleClick }>
      <i className="icon icon--exclamation-mark" />
      <span>{ TITLE }</span>
    </a>`

  report: ->
    @createRequest
      url: ApiRoutes.tlog_report @props.userId
      method: 'POST'
      success: ->
        TastyNotifyController.notify 'success', 'Жалоба на пользователя принята, и будет рассмотрена в ближайшее время'
      error: (data) ->
        TastyNotifyController.errorResponse data

  handleClick: ->
    @props.onClick()
    @report()