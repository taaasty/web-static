Api                      = require '../../api/api'
NotifyController         = require '../../controllers/notify'
CurrentUserServerActions = require '../server/currentUser'

CurrentUserViewActions =

  updateEmail: (newEmail) ->
    @update(email: newEmail)
      .then ->
        NotifyController.notifySuccess i18n.t 'messages.settings_update_email_success'

  updateAvatar: (formData) ->
    Api.currentUser.updateAvatar formData
      .then (userpic) ->
        NotifyController.notifySuccess i18n.t 'messages.settings_update_avatar_success'
        CurrentUserServerActions.updateAvatar userpic
      .fail (xhr) ->
        NotifyController.errorResponse xhr

  update: (data) ->
    Api.currentUser.update data
      .then (user) ->
        NotifyController.notifySuccess i18n.t 'messages.settings_update_success'
        CurrentUserServerActions.update user
      .fail (xhr) ->
        NotifyController.errorResponse xhr

  cancelEmailConfirmation: ->
    Api.currentUser.cancelEmailConfirmation()
      .then ->
        NotifyController.notifySuccess i18n.t 'messages.settings_cancel_email_confirmation_success'
        CurrentUserServerActions.cancelEmailConfirmation()

module.exports = CurrentUserViewActions