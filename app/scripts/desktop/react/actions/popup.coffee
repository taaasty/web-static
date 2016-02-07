{ render } = require 'react-dom';
PinEntryPopup = require('../components/Editor/PinEntryPopup');
UserOnboarding = require '../components/UserOnboarding';
CurrentUserStore = require '../stores/current_user'
Searchbox = require '../components/Searchbox/Searchbox'

PopupActions =
  showSettings: ->
    ReactApp.popupController.openWithBackground({
      Component: Settings
      popupProps:
        title: i18n.t('settings_header')
        className: 'popup--settings popup--dark'
        clue: 'settings'
    })

  showUserOnboarding: ->
    ReactApp.popupController.openWithBackground({
      Component: UserOnboarding,
      popupProps:
        title: i18n.t('user_onboarding_title')
        className: 'popup--onboarding popup--dark'
        clue: 'userOnboarding'
    })

  showDesignSettings: ->
    url = location.href
    user = CurrentUserStore.getUser()

    if url.indexOf(user.tlog_url.toLowerCase()) == -1
      TastyConfirmController.show
        message: i18n.t 'design_settings_page_confirm'
        acceptButtonText: i18n.t 'design_settings_page_confirm_approve'
        acceptButtonColor: 'green'
        onAccept: ->
          window.location.href = Routes.userDesignSettings user.slug
    else
      ReactApp.popupController.open
        Component: DesignSettingsContainer
        popupProps:
          title: i18n.t('design_settings_header')
          className: 'popup--design-settings'
          clue: 'designSettings'
          draggable: true
        containerAttribute: 'design-settings-container'

  showDesignSettingsPayment: ->
    ReactApp.popupController.openWithBackground
      Component: DesignPaymentContainer
      popupProps:
        title: i18n.t('design_payment_header')
        className: 'popup--payment'

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

    render (
      <PersonsPopup panelName={ panelName } userId={ userId } />
    ), container

  createFlow: ->
    ReactApp.popupController.openWithBackground({
      Component: FlowCreator
      popupProps:
        title: i18n.t('create_flow.header')
        className: 'popup--dark popup--flows'
        clue: 'create-flow'
    })

  manageFlow: (flow, onUpdate) ->
    ReactApp.popupController.openWithBackground({
      Component: FlowManager
      props: {flow, onUpdate}
      popupProps:
        title: i18n.t('manage_flow.header')
        className: 'popup--dark popup--flows'
        clue: 'manage-flow'
    })

  toggleFriends: ->
    container = document.querySelector '[popup-persons-container]'

    if container?
      ReactApp.popupController.close 'popup-persons-container'
    else
      @showFriends()

  toggleDesignSettings: ->
    container = document.querySelector '[design-settings-container]'

    if container?
      ReactApp.popupController.close 'design-settings-container'
    else
      @showDesignSettings()

  toggleMessages: ->
    messagingService.toggleMessagesPopup()

  showNotifications: ->
    ReactApp.padController.open(NotificationsContainer, {
      actSelector: '.toolbar__nav-item .icon--bell'
    });

  showPinEntryPopup: (props) ->
    ReactApp.popupController.openWithBackground({
      props,
      Component: PinEntryPopup,
      popupProps: {
        title: 'eeee',
        className: '',
        clue: '',
      }
    });

module.exports = PopupActions
