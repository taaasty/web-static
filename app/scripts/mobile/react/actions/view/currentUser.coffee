Api                      = require '../../api/api'
NotifyController         = require '../../controllers/notify'
CurrentUserServerActions = require '../server/currentUser'

CurrentUserViewActions =

  updateEmail: (newEmail) ->
    @update(email: newEmail)
      .then ->
        NotifyController.notifySuccess 'Письмо отправлено на почту'

  update: (data) ->
    Api.currentUser.update data
      .then (user) ->
        CurrentUserServerActions.update user
        NotifyController.notifySuccess 'Настройки успешно сохранены'
      .fail (xhr) ->
        NotifyController.errorResponse xhr

  cancelEmailConfirmation: ->
    Api.currentUser.cancelEmailConfirmation()
      .then ->
        NotifyController.notifySuccess 'Вы успешно отказались от изменения емейла'
        CurrentUserServerActions.cancelEmailConfirmation()

module.exports = CurrentUserViewActions