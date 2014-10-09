###* @jsx React.DOM ###

window.IndicatorsToolbar_Notifications = React.createClass

  getInitialState: -> @getStateFromStore()

  componentDidMount: ->
    MessagingStatusStore.addChangeListener @_onStoreChange

  componentWillUnmount: ->
    MessagingStatusStore.removeChangeListener @_onStoreChange

  render: ->
    if @hasUnreadNotifications()
      return `<div className="toolbar__indicator"
                   onClick={ this.handleClick }>
                <span className="notifications-badge">
                  { this.state.unreadNotificationsCount }
                </span>
              </div>`
    else
      return null

  handleClick: ->
    PopupActions.toggleNotificationsPopup()

  hasUnreadNotifications: -> !!@state.unreadNotificationsCount

  getStateFromStore: ->
    unreadNotificationsCount: MessagingStatusStore.getUnreadNotificationsCount()

  _onStoreChange: ->
    @setState @getStateFromStore()