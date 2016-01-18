_          = require 'lodash'
Dispatcher = require('flux').Dispatcher

# In a Flux app there should only be one Dispatcher.
# http://stackoverflow.com/a/23597375

AppDispatcher = _.extend new Dispatcher(),

  handleViewAction: (action) ->
    @dispatch { source: 'VIEW_ACTION', action }

  handleServerAction: (action) ->
    @dispatch { source: 'SERVER_ACTION', action }

module.exports = AppDispatcher
