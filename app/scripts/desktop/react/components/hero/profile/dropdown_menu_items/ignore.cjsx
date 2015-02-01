window.HeroProfile_DropdownMenuIgnoreItem = React.createClass
  mixins: [RequesterMixin]

  propTypes:
    userId:       React.PropTypes.number.isRequired
    onRequestEnd: React.PropTypes.func.isRequired

  render: ->
    <a className="action-dropdown-item"
       onClick={ this.ignore }>
      <i className="icon icon--not-allowed" />
      { i18n.t('ignore_tlog_item') }
    </a>

  ignore: ->
    @createRequest(
      url: ApiRoutes.change_my_relationship_url @props.userId, 'ignore'
      method: 'POST'
      success: (relationship) =>
        TastyEvents.emit TastyEvents.keys.follow_status_changed(@props.userId), relationship.state
        @props.onRequestEnd()
      error: (data) ->
        TastyNotifyController.errorResponse data
    , { progressBar: true })