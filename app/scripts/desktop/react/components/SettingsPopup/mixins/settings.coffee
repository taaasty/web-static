ErrorService = require '../../../../../shared/react/services/Error';
NoticeService = require '../../..//services/Notice';
CurrentUserViewActions = require '../../../actions/view/current_user'
TastyLockingAlertController = require '../../../controllers/TastyLockingAlertController';

SettingsMixin =
  updateFbCrosspost: (allow) ->
    if allow
      href = CurrentUserStore.getOmniauthEnableUrl('facebook')
      if href
        TastyLockingAlertController.show({
          title: i18n.t('settings_alert_header'),
          message: i18n.t('settings_alert_redirect', { context: 'facebook' }),
          action: () => window.location.href = href,
        })
      else
        ErrorService.notifyError('Отсутствует URL для соц. авторизации', {
          componentName: this.constructor.displayName,
          method: 'updateFbCrosspost',
          userId: CurrentUserStore.getUserID(),
          social: 'facebook',
        });
        NoticeService.notifyError(i18n.t('settings_change_crosspost_error', { context: 'facebook' }), 2000);
    else
      CurrentUserViewActions.stopFbCrosspost({
        beforeSend: => this.incrementActivities(),
        success: => NoticeService.notifySuccess(i18n.t('settings_change_crosspost_success', { context: 'facebook' }), 2000),
        complete: => this.decrementActivities()
      })

  updateTwitterCrosspost: (allow) ->
    if allow
      href = CurrentUserStore.getOmniauthEnableUrl('twitter')
      if href
        TastyLockingAlertController.show({
          title: i18n.t('settings_alert_header'),
          message: i18n.t('settings_alert_redirect', { context: 'twitter' }),
          action: () => window.location.href = href,
        })
      else
        ErrorService.notifyError('Отсутствует URL для соц. авторизации', {
          componentName: this.constructor.displayName,
          method: 'updateTwitterCrosspost',
          userId: CurrentUserStore.getUserID(),
          social: 'twitter',
        });
        NoticeService.notifyError(i18n.t('settings_change_crosspost_error', { context: 'twitter' }), 2000);
    else
      CurrentUserViewActions.stopTwitterCrosspost({
        beforeSend: => this.incrementActivities(),
        success: => NoticeService.notifySuccess(i18n.t('settings_change_crosspost_success', { context: 'twitter' }), 2000),
        complete: => this.decrementActivities()
      })

module.exports = SettingsMixin
