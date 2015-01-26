i18n             = require 'i18next'
Api              = require '../../api/api'
NotifyController = require '../../controllers/notify'

RECOVERY_MAIL_SENT_MESSAGE = -> i18n.t 'recovery_mail_sent'

SessionsViewActions =

  signIn: (login, password) ->
    Api.sessions.signIn login, password
      .then (user) ->
        NotifyController.notifySuccess "Добро пожаловать, #{ user.slug }! Подождите, я перезагружусь.."
        user
      .fail (xhr) ->
        NotifyController.errorResponse xhr

  signUp: (email, password, nickname) ->
    Api.sessions.signUp email, password, nickname
      .then (user) ->
        NotifyController.notifySuccess "Добро пожаловать, #{ user.slug }! Подождите, я перезагружусь.."
        user
      .fail (xhr) ->
        NotifyController.errorResponse xhr

  recover: (login) ->
    Api.sessions.recover login
      .then ->
        NotifyController.notifySuccess RECOVERY_MAIL_SENT_MESSAGE()
      .fail (xhr) ->
        NotifyController.errorResponse xhr

module.exports = SessionsViewActions