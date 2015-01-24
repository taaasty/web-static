Api              = require '../../api/api'
NotifyController = require '../../controllers/notify'

#TODO: i18n
RECOVERY_MAIL_SENT_MESSAGE = 'Вам на почту отправлена ссылка для восстановления пароля'

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
        NotifyController.notifySuccess RECOVERY_MAIL_SENT_MESSAGE
      .fail (xhr) ->
        NotifyController.errorResponse xhr

module.exports = SessionsViewActions