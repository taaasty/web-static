/*global NoticeService */
import Api from '../api/api';
import NotificationConstants from '../constants/notification';
import AppDispatcher from '../dispatchers/dispatcher';

const NotificationActionCreators = {
  load() {
    // async setState workaround
    window.setTimeout(function() {
      AppDispatcher.handleViewAction({
        type: NotificationConstants.LOAD,
      });
    }, 0);

    Api.notifications.load()
      .then((response) => {
        let { notifications, total_count: totalCount } = response;
        AppDispatcher.handleServerAction({
          notifications, totalCount,
          type: NotificationConstants.LOAD_SUCCESS,
        });
      })
      .fail((xhr) => {
        NoticeService.errorResponse(xhr);
        AppDispatcher.handleServerAction({
          type: NotificationConstants.LOAD_ERROR,
        });
      });
  },

  markAsRead(notificationID) {
    Api.notifications.markAsRead(notificationID)
      .then((notification) => {
        AppDispatcher.handleServerAction({
          notification,
          type: NotificationConstants.MARK_AS_READ_SUCCESS,
        });
      })
      .fail((xhr) => {
        NoticeService.errorResponse(xhr);
      });
  },

  loadMore(sinceID) {
    AppDispatcher.handleViewAction({
      type: NotificationConstants.LOAD_MORE,
    });

    Api.notifications.load(sinceID)
      .then((response) => {
        let { notifications, total_count: totalCount } = response;
        AppDispatcher.handleServerAction({
          notifications, totalCount,
          type: NotificationConstants.LOAD_MORE_SUCCESS,
        });
      })
      .fail((xhr) => {
        NoticeService.errorResponse(xhr);
        AppDispatcher.handleServerAction({
          type: NotificationConstants.LOAD_MORE_ERROR,
        });
      });
  },
};

export default NotificationActionCreators;
