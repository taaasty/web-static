Api              = require '../../api/api'
NotifyController = require '../../controllers/notify'

#TODO: i18n

SessionsViewActions =

  login: (login, password) ->
    Api.sessions.login login, password
      .then (user) ->
        NotifyController.notifySuccess "Добро пожаловать, #{ user.slug }! Подождите, я перезагружусь.."
      .fail (xhr) ->
        NotifyController.errorResponse xhr

module.exports = SessionsViewActions