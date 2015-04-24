CurrentUserViewActions = require '../../../actions/view/current_user'

SettingsMixin =

  updateSlug: (slug) ->
    CurrentUserViewActions.updateSlug
      slug: slug
      beforeSend: => @incrementActivities()
      success: (data) ->
        TastyLockingAlertController.show
          title:   i18n.t 'settings_alert_header'
          message: i18n.t 'settings_redirect', tlogUrl: data.tlog_url
          action: -> window.location = data.tlog_url
      complete: => @decrementActivities()

  updateTitle: (title) ->
    CurrentUserViewActions.updateTitle
      title: title
      beforeSend: => @incrementActivities()
      success:    => NoticeService.notifySuccess i18n.t('settings_change_description_success'), 2000
      complete:   => @decrementActivities()

  updatePrivacy: (privacy) ->
    CurrentUserViewActions.updatePrivacy
      privacy: privacy
      beforeSend: => @incrementActivities()
      success:    => NoticeService.notifySuccess i18n.t('settings_change_privacy_success'), 2000
      complete:   => @decrementActivities()

  updateDaylog: (daylog) ->
    CurrentUserViewActions.updateDaylog
      daylog: daylog
      beforeSend: => @incrementActivities()
      success:    => NoticeService.notifySuccess i18n.t('settings_change_daylog_success'), 2000
      complete:   => @decrementActivities()

  updateFemale: (female) ->
    CurrentUserViewActions.updateFemale
      female: female
      beforeSend: => @incrementActivities()
      success:    => NoticeService.notifySuccess i18n.t('settings_change_gender_success'), 2000
      complete:   => @decrementActivities()

  updatePassword: ({password, success}) ->
    CurrentUserViewActions.updatePassword
      password: password
      beforeSend: => @incrementActivities()
      success: =>
        NoticeService.notifySuccess i18n.t('settings_change_password_success'), 2000
        success?()
      complete: => @decrementActivities()

  updateAvailableNotifications: (availableNotifications) ->
    CurrentUserViewActions.updateAvailableNotifications
      availableNotifications: availableNotifications
      beforeSend: => @incrementActivities()
      success:    => NoticeService.notifySuccess i18n.t('settings_change_notifications_success'), 2000
      complete:   => @decrementActivities()

  updateEmail: ({email, success}) ->
    CurrentUserViewActions.updateEmail
      email: email
      beforeSend: => @incrementActivities()
      success: =>
        success?()
        NoticeService.notifySuccess i18n.t('settings_change_email_mail_sent'), 2000
      complete:   => @decrementActivities()

  updateLanguage: (language) ->
    @incrementActivities()

    CurrentUserViewActions.updateLanguage(language)
      .then (->
        NoticeService.notifySuccess i18n.t('settings_change_language_success'), 2000
        setTimeout (-> window.location.reload()), 1000
      )
      .always @decrementActivities

  cancelEmailConfirmation: ->
    CurrentUserViewActions.cancelEmailConfirmation
      beforeSend: => @incrementActivities()
      success:    => NoticeService.notifySuccess i18n.t('settings_change_email_canceled'), 2000
      complete:   => @decrementActivities()

  resendEmailConfirmation: ({beforeSend, error, success}) ->
    CurrentUserViewActions.resendEmailConfirmation
      beforeSend: =>
        @incrementActivities()
        beforeSend?()
      error: error
      success: ->
        NoticeService.notifySuccess i18n.t('settings_change_email_mail_resent'), 2000
        success?()
      complete: => @decrementActivities()

module.exports = SettingsMixin