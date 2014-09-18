window.CurrentUserDispatcher = _.extend new Dispatcher(),
  SERVER_ACTION: 'SERVER_ACTION'

  TYPE_SETUP: 'setup'

  # Устанавливается однажды при запуске системы
  setupUser: (user) ->
    @dispatch source: @SERVER_ACTION, type: @TYPE_SETUP, user: user
