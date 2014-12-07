CurrentUserViewActions = require '../../../actions/view/current_user'

SettingsMixin =

  updateSlug: (slug) ->
    CurrentUserViewActions.updateSlug {
      slug: slug
      beforeSend: => @incrementActivities()
      complete:   => @decrementActivities()
    }

  updateTitle: (title) ->
    CurrentUserViewActions.updateTitle {
      title: title
      beforeSend: => @incrementActivities()
      complete:   => @decrementActivities()
    }

  updatePrivacy: (privacy) ->
    CurrentUserViewActions.updatePrivacy {
      privacy: privacy
      beforeSend: => @incrementActivities()
      complete:   => @decrementActivities()
    }

  updateDaylog: (daylog) ->
    CurrentUserViewActions.updateDaylog {
      daylog: daylog
      beforeSend: => @incrementActivities()
      complete:   => @decrementActivities()
    }

  updateFemale: (female) ->
    CurrentUserViewActions.updateFemale {
      female: female
      beforeSend: => @incrementActivities()
      complete:   => @decrementActivities()
    }

  updateAvailableNotifications: (availableNotifications) ->
    CurrentUserViewActions.updateAvailableNotifications {
      availableNotifications: availableNotifications
      beforeSend: => @incrementActivities()
      complete:   => @decrementActivities()
    }

  saveChanges: (key, value) ->
    console.log 'save', key, value
  #   @incrementActivities()

  #   @setState isProcess: true

  #   data = {}
  #   data[key] = value

  #   @createRequest
  #     url:  ApiRoutes.update_profile_url()
  #     data: data
  #     dataType: 'JSON'
  #     method:   'PUT'
  #     success: (data) =>
  #       TastyEvents.trigger TastyEvents.keys.user_property_changed( key, @props.user.id ), [value]

  #       if key is 'slug'
  #         TastyLockingAlertController.show
  #           title:   'Внимание!'
  #           message: "Сейчас будет произведён переход по новому адресу вашего тлога (#{ data.tlog_url })"
  #           action:  -> window.location = data.tlog_url

  #       @props.user.set data
  #     error: (data) =>
  #       @shake()
  #       TastyNotifyController.errorResponse data
  #     complete: =>
  #       @safeUpdateState isProcess: false
  #       @decrementActivities()

module.exports = SettingsMixin