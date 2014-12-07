BaseDispatcher = require './_base'

window.CurrentUserDispatcher = _.extend new BaseDispatcher(),

  # Устанавливается однажды при запуске системы
  setupUser: (user) ->
    @handleServerAction
      type: 'setup'
      user: user