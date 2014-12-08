#TODO: i18n для всех сообщений

CurrentUserViewActions = require '../../../actions/view/current_user'

SettingsMixin =

  updateSlug: (slug) ->
    CurrentUserViewActions.updateSlug {
      slug: slug
      beforeSend: => @incrementActivities()
      success:    => TastyNotifyController.notifySuccess 'Псевдоним успешно изменено', 2000
      complete:   => @decrementActivities()
    }

  updateTitle: (title) ->
    CurrentUserViewActions.updateTitle {
      title: title
      beforeSend: => @incrementActivities()
      success:    => TastyNotifyController.notifySuccess 'Описание тлога успешно изменено', 2000
      complete:   => @decrementActivities()
    }

  updatePrivacy: (privacy) ->
    CurrentUserViewActions.updatePrivacy {
      privacy: privacy
      beforeSend: => @incrementActivities()
      success:    => TastyNotifyController.notifySuccess 'Приватность тлога успешно изменена', 2000
      complete:   => @decrementActivities()
    }

  updateDaylog: (daylog) ->
    CurrentUserViewActions.updateDaylog {
      daylog: daylog
      beforeSend: => @incrementActivities()
      success:    => TastyNotifyController.notifySuccess 'Настройки тлогодня успешно изменены', 2000
      complete:   => @decrementActivities()
    }

  updateFemale: (female) ->
    CurrentUserViewActions.updateFemale {
      female: female
      beforeSend: => @incrementActivities()
      success:    => TastyNotifyController.notifySuccess 'Настройки пола успешно изменены', 2000
      complete:   => @decrementActivities()
    }

  updateAvailableNotifications: (availableNotifications) ->
    CurrentUserViewActions.updateAvailableNotifications {
      availableNotifications: availableNotifications
      beforeSend: => @incrementActivities()
      success:    => TastyNotifyController.notifySuccess 'Настройки уведомлений успешно изменены', 2000
      complete:   => @decrementActivities()
    }

  updateEmail: ({email, success}) ->
    CurrentUserViewActions.updateEmail {
      email: email
      beforeSend: => @incrementActivities()
      success: =>
        success?()
        TastyNotifyController.notifySuccess 'На указанный адрес отправлено письмо для активации', 2000
      complete:   => @decrementActivities()
    }

  cancelEmailConfirmation: ->
    CurrentUserViewActions.cancelEmailConfirmation {
      beforeSend: => @incrementActivities()
      success:    => TastyNotifyController.notifySuccess 'Запрос на изменение емейла успешно отменён', 2000
      complete:   => @decrementActivities()
    }

  resendEmailConfirmation: ({beforeSend, error, success}) ->
    CurrentUserViewActions.resendEmailConfirmation {
      beforeSend: =>
        @incrementActivities()
        beforeSend?()
      error: error
      success: ->
        TastyNotifyController.notifySuccess 'Запрос на изменение емейла отправлен повторно', 2000
        success?()
      complete: => @decrementActivities()
    }

module.exports = SettingsMixin