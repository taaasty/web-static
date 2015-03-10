CurrentUserStore = require '../stores/current_user'
Searchbox = require '../components/searchbox/index'
DesignSettingsManager = require '../components/designSettings/manager'
DesignSettingsColorPickerPopup = require '../components/designSettings/common/colorPicker/popup'

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
    user = CurrentUserStore.getUser()

    # if url.indexOf(user.tlog_url) == -1
    #   TastyConfirmController.show
    #     message: i18n.t 'design_settings_page_confirm'
    #     acceptButtonText: i18n.t 'design_settings_page_confirm_approve'
    #     acceptButtonColor: 'green'
    #     onAccept: ->
    #       location.href = Routes.userDesignSettings user.slug
    # else
    ReactApp.popupController.open DesignSettingsManager, {}, 'design-settings-container'

  showSearch: (props) ->
    ReactApp.popupController.openPopup Searchbox, props, 'searchbox-container'

  showColorPicker: (props) ->
    ReactApp.popupController.openPopup DesignSettingsColorPickerPopup, props, 'color-picker-container'

  closeColorPicker: ->
    ReactApp.popupController.close 'color-picker-container'

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