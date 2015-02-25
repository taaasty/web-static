CurrentUserStore = require '../stores/current_user'

PopupActions =

  showSettings: ->
    ReactApp.popup.show Settings, title: i18n.t('settings_header')

  showDesignSettings: ->
    url = location.href
    container = document.querySelector '[popup-design-settings-container]'
    user = CurrentUserStore.getUser()

    unless container?
      container = document.createElement 'div'
      container.setAttribute 'popup-design-settings-container', ''
      document.body.appendChild container

    if url.indexOf(user.tlog_url) == -1
      TastyConfirmController.show
        message: i18n.t 'design_settings_page_confirm'
        acceptButtonText: i18n.t 'design_settings_page_confirm_approve'
        acceptButtonColor: 'green'
        onAccept: ->
          location.href = Routes.userDesignSettings user.slug
    else
      React.render <DesignSettingsPopup />, container

  showFriends: (panelName, userId) ->
    container = document.querySelector '[popup-persons-container]'

    unless container?
      container = document.createElement 'div'
      container.setAttribute 'popup-persons-container', ''
      document.body.appendChild container

    React.render (
      <PersonsPopup
          panelName={ panelName }
          userId={ userId } />
    ), container

  toggleMessages: ->
    messagingService.toggleMessagesPopup()

  toggleNotifications: ->
    messagingService.toggleNotificationsPopup()

module.exports = PopupActions