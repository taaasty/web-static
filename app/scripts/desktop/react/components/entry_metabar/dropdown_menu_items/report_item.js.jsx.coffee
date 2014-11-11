###* @jsx React.DOM ###

window.EntryMetabarDropdownMenuReportItem = React.createClass
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

    TastyConfirmController.show
      message:          'Вы действительно хотите пожаловаться на пост?'
      acceptButtonText: 'Пожаловаться'
      onAccept:         @createReport

  createReport: ->
    @createRequest
      url: ApiRoutes.report_url @props.entryId
      method: 'POST'
      success: => TastyNotifyController.notify 'success', 'Жалоба на пост успешно отправлена'
      error:   (data) -> TastyNotifyController.errorResponse data