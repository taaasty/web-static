CurrentUserViewActions = require '../../../actions/view/currentUser'

SettingsEmailMixin =

  updateEmail: (newEmail) ->
    CurrentUserViewActions.updateEmail newEmail

  cancelEmailConfirmation: ->
    CurrentUserViewActions.cancelEmailConfirmation()

module.exports = SettingsEmailMixin