Constants     = require '../../constants/constants'
AppDispatcher = require '../../dispatcher/dispatcher'

CurrentUserServerActions =

  update: (user) ->
    AppDispatcher.handleServerAction
      type: Constants.currentUser.UPDATE
      user: user

  cancelEmailConfirmation: ->
    AppDispatcher.handleServerAction
      type: Constants.currentUser.CANCEL_EMAIL_CONFIRMATION

module.exports = CurrentUserServerActions