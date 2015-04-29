import _ from 'lodash';
import assign from 'react/lib/Object.assign';
import BaseStore from './_base';
import NotificationConstants from '../constants/notification';
import AppDispatcher from '../dispatchers/dispatcher';

let _notifications = {},
    _everythingLoaded = false,
    _loading = false,
    _loadingMore = false,
    _error = false;

let NotificationStore = assign(new BaseStore(), {
  getAll() {
    return _notifications;
  },

  getAllChrono() {
    let notifications = [];

    _.forEach(_notifications, (item) => notifications.push(item));
    notifications = _.sortBy(notifications, (item) => -item.id);

    return notifications;
  },

  isEverythingLoaded() {
    return _everythingLoaded;
  },

  isLoading() {
    return _loading;
  },

  isLoadingMore() {
    return _loadingMore;
  },

  isError() {
    return _error;
  }
});

NotificationStore.dispatchToken = AppDispatcher.register((payload) => {
  let { action } = payload;

  switch(action.type) {
    case NotificationConstants.LOAD:
      _loading = true;
      _error = false;
      break;

    case NotificationConstants.LOAD_SUCCESS:
      if (action.notifications.length) {
        action.notifications.forEach((item) => _notifications[item.id] = item);
      } else {
        _everythingLoaded = true
      }
      _loading = false;
      break;

    case NotificationConstants.LOAD_ERROR:
      _loading = false;
      _error = true;
      break;

    case NotificationConstants.LOAD_MORE:
      _loadingMore = true;
      break;

    case NotificationConstants.LOAD_MORE_SUCCESS:
      if (action.notifications.length) {
        action.notifications.forEach((item) => _notifications[item.id] = item);
      } else {
        _everythingLoaded = true
      }
      _loadingMore = false;
      break;

    case NotificationConstants.LOAD_MORE_ERROR:
      _loadingMore = false;
      break;

    case NotificationConstants.MARK_AS_READ_SUCCESS:
      _.extend(_notifications[action.notification.id], action.notification);
      break;

    default:
      return true;
  }

  NotificationStore.emitChange();
});

export default NotificationStore;