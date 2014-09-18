window.MessagingDispatcher = _.extend new Dispatcher(), {

  handleViewAction: (action) ->
    @dispatch { source: 'VIEW_ACTION', action }

}