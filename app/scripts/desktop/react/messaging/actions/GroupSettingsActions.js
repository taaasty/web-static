/*global $, NoticeService */
import MessagingDispatcher from '../MessagingDispatcher';
import ApiRoutes from '../../../../shared/routes/api';
import { prepareFormData } from '../../../../shared/helpers/api';

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
    const formData = prepareFormData(settings);

    MessagingDispatcher.handleViewAction({
        type: 'groupSettingsRequest',
        payload: true,
    });

    const req = settings.id
      ? $.ajax({
          url: ApiRoutes.messengerConversationsById(settings.id),
          processData: false,
          contentType: false,
          method: 'POST',
          data: formData,
        })
        .done((data) => {
          MessagingDispatcher.handleServerAction({
            type: 'updateConversation',
            conversation: data,
          });
          MessagingDispatcher.handleServerAction({
            type: 'closeGroupSettings',
          });
        })
      : $.ajax({
          url: ApiRoutes.messengerConversationsByUserIds(),
          processData: false,
          contentType: false,
          method: 'POST',
          data: formData,
        })
        .done((data) => {
          MessagingDispatcher.handleServerAction({
            type: 'postNewConversation',
            conversation: data,
          });
          MessagingDispatcher.handleServerAction({
            type: 'closeGroupSettings',
          });
        });

    req
      .fail((error) => NoticeService.errorResponse(error))
      .always(() => {
        MessagingDispatcher.handleViewAction({
          type: 'groupSettingsRequest',
          payload: false,
        });
    });
  },
};

export default GroupSettingsActions;
