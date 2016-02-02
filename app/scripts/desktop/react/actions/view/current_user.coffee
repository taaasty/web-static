CurrentUserResource      = require '../../resources/current_user'
CurrentUserServerActions = require '../server/current_user'

CurrentUserViewActions =

  updateSlug: (options = {}) ->
    _.extend options, {
      data:
        slug: options.slug
    }
    @update options

  updateTitle: (options = {}) ->
    _.extend options, {
      data:
        title: options.title
    }
    @update options

  updatePrivacy: (options = {}) ->
    _.extend options, {
      data:
        is_privacy: options.privacy
    }
    @update options

  updateDaylog: (options = {}) ->
    _.extend options, {
      data:
        is_daylog: options.daylog
    }
    @update options

  updateFemale: (options = {}) ->
    _.extend options, {
      data:
        is_female: options.female
    }
    @update options

  updateAvailableNotifications: (options = {}) ->
    _.extend options, {
      data:
        available_notifications: options.availableNotifications
    }
    @update options

  updatePhone: (options = {}) ->
    _.extend(options, {
      data: {
        phone: options.phone
      }
    })
    this.update(options)

  updateEmail: (options = {}) ->
    _.extend options, {
      data:
        email: options.email
    }
    @update options

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

  update: ({data, beforeSend, success, error, complete}) ->
    CurrentUserResource.update
      data: data
      beforeSend: beforeSend
      success: (user) ->
        CurrentUserServerActions.updateUser user
        success?(user)
      error: (data) ->
        NoticeService.errorResponse data
        error?(data)
      complete: complete

module.exports = CurrentUserViewActions
