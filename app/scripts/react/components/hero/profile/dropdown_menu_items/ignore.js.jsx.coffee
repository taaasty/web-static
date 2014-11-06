###* @jsx React.DOM ###

#TODO: i18n
TITLE = 'Заблокировать'

window.HeroProfile_DropdownMenuIgnoreItem = React.createClass
  mixins: [RequesterMixin]

  propTypes:
    userId:  React.PropTypes.number.isRequired
    onClick: React.PropTypes.func.isRequired

  render: ->
   `<a title={ TITLE }
       className="action-dropdown-item"
       onClick={ this.handleClick }>
      <i className="icon icon--not-allowed" />
      <span>{ TITLE }</span>
    </a>`

  ignore: ->
    @createRequest
      url: ApiRoutes.change_my_relationship_url @props.userId, 'ignore'
      method: 'POST'
      success: (relationship) =>
        TastyEvents.emit TastyEvents.keys.follow_status_changed(@props.userId), relationship.state
      error: (data) ->
        TastyNotifyController.errorResponse data

  handleClick: ->
    @props.onClick()
    @ignore()