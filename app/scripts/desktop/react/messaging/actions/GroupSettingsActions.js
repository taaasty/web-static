import MessagingDispatcher from '../MessagingDispatcher';

export const CHOOSER_STATE = 'CHOOSER_STATE';
export const SETTINGS_STATE = 'SETTINGS_STATE';

const GroupSettingsActions = {
  updateSettings(settings) {
    MessagingDispatcher.handleViewAction({
      type: 'groupSettingsSet',
      payload: settings,
    });
  },

  toggleSelectedId(id) {
    MessagingDispatcher.handleViewAction({
      type: 'groupSettingsToggleSelectedId',
      payload: id,
    });
  },

  addUser(user) {
    MessagingDispatcher.handleViewAction({
      type: 'groupSettingsAddUser',
      payload: user,
    });
  },
}

export default GroupSettingsActions;
