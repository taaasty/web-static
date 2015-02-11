Api                      = require '../../api/api'
NotifyController         = require '../../controllers/notify'
CurrentUserServerActions = require '../server/currentUser'

CurrentUserViewActions =

  updateEmail: (newEmail) ->
    @update(email: newEmail)
      .then ->
        NotifyController.notifySuccess 'Письмо отправлено на почту'

  updateAvatar: (formData) ->
    Api.currentUser.updateAvatar formData
      .then (userpic) ->
        NotifyController.notifySuccess 'Аватар успешно изменён'
        CurrentUserServerActions.updateAvatar userpic
      .fail (xhr) ->
        NotifyController.errorResponse xhr

  update: (data) ->
    Api.currentUser.update data
      .then (user) ->
        NotifyController.notifySuccess 'Настройки успешно сохранены'
        CurrentUserServerActions.update user
      .fail (xhr) ->
        NotifyController.errorResponse xhr

  cancelEmailConfirmation: ->
    Api.currentUser.cancelEmailConfirmation()
      .then ->
        NotifyController.notifySuccess 'Вы успешно отказались от изменения емейла'
        CurrentUserServerActions.cancelEmailConfirmation()

module.exports = CurrentUserViewActions