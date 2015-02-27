Constants     = require '../constants/constants'
AppDispatcher = require '../dispatchers/dispatcher'

UserToolbarActions =

  initVisibility: (value) ->
    AppDispatcher.handleViewAction
      type: Constants.userToolbar.INIT_VISIBILITY
      value: value

  toggleVisibility: (value) ->
    AppDispatcher.handleViewAction
      type: Constants.userToolbar.TOGGLE_VISIBILITY
      value: value

module.exports = UserToolbarActions