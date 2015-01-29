Api              = require '../../api/api'
NotifyController = require '../../controllers/notify'

SessionsViewActions =

  signIn: (login, password) ->
    Api.sessions.signIn login, password
      .then (user) ->
        NotifyController.notifySuccess i18n.t 'signin_success', userSlug: user.slug
        user
      .fail (xhr) ->
        NotifyController.errorResponse xhr

  signUp: (email, password, nickname) ->
    Api.sessions.signUp email, password, nickname
      .then (user) ->
        NotifyController.notifySuccess i18n.t 'signup_success', userSlug: user.slug
        user
      .fail (xhr) ->
        NotifyController.errorResponse xhr

  recover: (login) ->
    Api.sessions.recover login
      .then ->
        NotifyController.notifySuccess i18n.t 'recovery_mail_sent'
      .fail (xhr) ->
        NotifyController.errorResponse xhr

module.exports = SessionsViewActions