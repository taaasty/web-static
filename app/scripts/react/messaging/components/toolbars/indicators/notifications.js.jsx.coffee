###* @jsx React.DOM ###

window.IndicatorsToolbar_Notifications = React.createClass

  getInitialState: -> @getStateFromStore()

  componentDidMount: ->
    MessagingStatusStore.addChangeListener @_onStoreChange

  componentDidUpdate: (prevProps, prevState) ->
    if prevState.unreadNotificationsCount > 0 && !@hasUnreadNotifications()
      PopupActions.closeNotificationsPopup()

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