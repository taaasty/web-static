###* @jsx React.DOM ###

window.NotificationsPopup_Notifications = React.createClass

  getInitialState: -> @getStateFromStore()

  componentDidMount: ->
    NotificationsStore.addChangeListener @_onStoreChange

  componentWillUnmount: ->
    NotificationsStore.removeChangeListener @_onStoreChange

  render: ->
    if @isEmpty()
      notifications = `<NotificationsPopup_NotificationsEmpty />`
    else
      notifications = @state.notifications.map (notification, i) ->
        `<NotificationsPopup_Notification notification={ notification }
                                          key={ notification.id } />`

    return `<ul className="notifications__list">
              { notifications }
            </ul>`

  isEmpty: ->
    @state.notifications.length == 0

  getStateFromStore: ->
    notifications: NotificationsStore.getNotifications()

  _onStoreChange: ->
    @setState @getStateFromStore()