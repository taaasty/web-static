CurrentUserStore = require '../stores/current_user'
Searchbox = require '../components/searchbox/index'

PopupActions =

  showSettings: ->
    ReactApp.popupController.openWithBackground({
      component: Settings
      popupProps:
        title: i18n.t('settings_header')
        className: 'popup--settings popup--dark'
    })

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

  showSearch: (props) ->
    ReactApp.popupController.openPopup Searchbox, props, 'searchbox-container'

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