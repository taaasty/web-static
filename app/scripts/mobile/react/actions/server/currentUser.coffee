Constants     = require '../../constants/constants'
AppDispatcher = require '../../dispatcher/dispatcher'

CurrentUserServerActions =

  update: (user) ->
    AppDispatcher.handleServerAction
      type: Constants.currentUser.UPDATE
      user: user

  updateAvatar: (userpic) ->
    AppDispatcher.handleServerAction
      type:    Constants.currentUser.UPDATE_AVATAR
      userpic: userpic

  cancelEmailConfirmation: ->
    AppDispatcher.handleServerAction
      type: Constants.currentUser.CANCEL_EMAIL_CONFIRMATION

module.exports = CurrentUserServerActions