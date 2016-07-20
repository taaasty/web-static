CurrentUserResource      = require '../../resources/current_user'
CurrentUserServerActions = require '../server/current_user'

CurrentUserViewActions =

  updatePassword: (options = {}) ->
    _.extend options, {
      data:
        password: options.password
    }
    @update options

  updateLanguage: (language) ->
    data = locale: language
    @update {data}

  stopFbCrosspost: (options = {}) ->
    oldSuccess = options.success
    options.success = ->
      CurrentUserServerActions.stopFbCrosspost()
      oldSuccess?()
    CurrentUserResource.stopFbCrosspost(options);

  stopTwitterCrosspost: (options = {}) ->
    oldSuccess = options.success
    options.success = ->
      CurrentUserServerActions.stopTwitterCrosspost()
      oldSuccess?()
    CurrentUserResource.stopTwitterCrosspost(options);

  cancelEmailConfirmation: ({beforeSend, success, error, complete}) ->
    CurrentUserResource.cancelEmailConfirmation
      beforeSend: beforeSend
      success: ->
        CurrentUserServerActions.cancelEmailConfirmation()
        success?()
      error: error
      complete: complete

  resendEmailConfirmation: ({beforeSend, success, error, complete}) ->
    CurrentUserResource.resendEmailConfirmation
      beforeSend: beforeSend
      success: success
      error: error
      complete: complete

module.exports = CurrentUserViewActions
