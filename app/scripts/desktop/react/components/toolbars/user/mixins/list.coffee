UserToolbarListMixin =

  componentDidMount: ->
    TastyEvents.on TastyEvents.keys.command_settings_open(),        @showSettings
    TastyEvents.on TastyEvents.keys.command_requested_open(),       @showFriendsRequested
    TastyEvents.on TastyEvents.keys.command_design_settings_open(), @showDesignSettings

    if localStorage.getItem 'displayDesignSettings'
      @showDesignSettings()
      localStorage.removeItem 'displayDesignSettings'

  componentWillUnmount: ->
    clearTimeout @timeout if @timeout

    TastyEvents.off TastyEvents.keys.command_settings_open(),        @showSettings
    TastyEvents.off TastyEvents.keys.command_requested_open(),       @showFriendsRequested
    TastyEvents.off TastyEvents.keys.command_design_settings_open(), @showDesignSettings

  showProfile: ->
    slug = CurrentUserStore.getUser().slug
    currentUrl = window.location.href
    profileUrl = "#{ @props.myTlogUrl }/profile"

    if profileUrl.indexOf(currentUrl) != -1
      Aviator.navigate "/@#{ slug }/profile"
    else
      window.location = profileUrl

  showFriends: (panelName, userId) ->
    container = document.querySelectorAll('[popup-persons-container]')[0]

    unless container
      container = $('<\div>', {'popup-persons-container': ''}).appendTo('body').get 0

    React.renderComponent PersonsPopup({
      panelName: panelName
      userId:    userId
    }), container

  showFriendsRequested: (userId) ->
    @showFriends 'requested', userId

  showDesignSettings: ->
    url = window.location.href
    container = document.querySelectorAll('[popup-design-settings-container]')[0]

    unless container
      container = $('<\div>', {'popup-design-settings-container': ''}).appendTo('body').get 0

    if url.indexOf( @props.myTlogUrl ) == -1
      TastyConfirmController.show
        message:           'Для изменения дизайна вашего дневника, необходимо перейти в тлог'
        acceptButtonText:  'Перейти в тлог'
        acceptButtonColor: 'green'
        onAccept:          @redirectToProfile
    else
      React.renderComponent DesignSettingsPopup(), container

  showSettings: ->
    ReactApp.popup.show Settings, title: 'Настройки'

  showMessages: ->
    PopupActions.openMessagesPopup()

  redirectToProfile: ->
    localStorage.setItem 'displayDesignSettings', true
    window.location = @props.myTlogUrl

module.exports = UserToolbarListMixin