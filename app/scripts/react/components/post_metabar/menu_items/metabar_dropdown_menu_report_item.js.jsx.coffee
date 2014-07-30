###* @jsx React.DOM ###

window.MetabarDropdownMenuReportItem = React.createClass
  mixins: [RequesterMixin]

  propTypes:
    entryId: React.PropTypes.number.isRequired

  render: ->
    `<a onClick={ this.onClick }
        className="meta-item__dropdown-item">
      <i className="icon icon--exclamation-mark"></i>
      Пожаловаться
    </a>`

  onClick: (e) ->
    e.stopPropagation()
    e.preventDefault()

    @createReport() if confirm 'Вы действительно хотите пожаловаться на пост?'

  createReport: ->

    @createRequest
      url: Routes.api.report_url @props.entryId
      method: 'POST'
      success: => TastyNotifyController.notify 'Жалоба на пост успешно отправлена'
      error:   (data) -> TastyNotifyController.errorResponse data