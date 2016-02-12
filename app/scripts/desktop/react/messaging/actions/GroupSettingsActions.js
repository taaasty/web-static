/*global $ */
import MessagingDispatcher from '../MessagingDispatcher';

export const CHOOSER_STATE = 'CHOOSER_STATE';
export const SETTINGS_STATE = 'SETTINGS_STATE';

const GroupSettingsActions = {
  updateSettings(settings) {
    MessagingDispatcher.handleViewAction({
      type: 'groupSettingsUpdateSettings',
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

  saveSettings(settings) {
    MessagingDispatcher.handleViewAction({
        type: 'groupSettingsRequest',
        payload: true,
    });
    const req = settings.id
            ? $.ajax({})
            .done()
            .fail()
            : $.ajax()
            .done()
            .fail();

    req.then(() => {
      MessagingDispatcher.handleViewAction({
        type: 'groupSettingsRequest',
        payload: false,
      });
    });
  },
};

export default GroupSettingsActions;
