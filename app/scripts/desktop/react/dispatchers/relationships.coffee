window.RelationshipsDispatcher = _.extend new Dispatcher(),

  handleViewAction: (action) ->
    payload = {
      source: 'viewAction'
      action: action
    }

    @dispatch payload

  handleServerAction: (action) ->
    payload = {
      source: 'serverAction'
      action: action
    }

    @dispatch payload