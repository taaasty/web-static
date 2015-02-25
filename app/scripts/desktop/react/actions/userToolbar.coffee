Constants     = require '../constants/constants'
AppDispatcher = require '../dispatchers/dispatcher'

UserToolbarActions =

  toggleVisibility: (value) ->
    AppDispatcher.handleViewAction
      type: Constants.userToolbar.TOGGLE_VISIBILITY
      value: value

module.exports = UserToolbarActions