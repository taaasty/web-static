{ render } = require 'react-dom';
PinEntryPopup = require('../components/Editor/PinEntryPopup');
UserOnboarding = require '../components/UserOnboarding';
CurrentUserStore = require '../stores/current_user'
Searchbox = require '../components/Searchbox/Searchbox'
FlowCreator = require '../components/FlowCreator';
uri = require 'urijs';

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
    ReactApp.popupController.open({
      Component: DesignSettingsContainer,
      popupProps: {
        title: i18n.t('design_settings_header'),
        className: 'popup--design-settings',
        clue: 'designSettings',
        draggable: true,
      },
      containerAttribute: 'design-settings-container',
    });

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

  createFlow: ->
    ReactApp.popupController.openWithBackground({
      Component: FlowCreator
      popupProps:
        title: i18n.t('create_flow.header')
        className: 'popup--dark popup--flows'
        clue: 'create-flow'
    })

  closeDesignSettings: ->
    container = document.querySelector '[design-settings-container]'

    if container?
      ReactApp.popupController.close 'design-settings-container'

  toggleDesignSettings: (ev) ->
    user = CurrentUserStore.getUser()

    if uri().path() == "/~#{user.slug}/design_settings"
      container = document.querySelector '[design-settings-container]'

      ev.preventDefault();
      if container?
        ReactApp.popupController.close 'design-settings-container'
      else
        @showDesignSettings()

  toggleMessages: ->
    messagingService.toggleMessagesPopup()

module.exports = PopupActions
