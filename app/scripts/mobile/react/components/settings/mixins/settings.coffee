_                      = require 'lodash'
NotifyController       = require '../../../controllers/notify'
CurrentUserViewActions = require '../../../actions/view/currentUser'

SettingsMixin =

  saveSettings: ->
    if _.size(@state.tempSettings) > 0
      CurrentUserViewActions.update @state.tempSettings
        .then @resetTempSettings
    else
      NotifyController.notifyError i18n.t('messages.settings_no_unsaved_changes_error')

module.exports = SettingsMixin