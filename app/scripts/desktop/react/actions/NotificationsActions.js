import { CALL_API, Schemas } from '../middleware/api';
import ApiRoutes from '../../../shared/routes/api';
import { defaultOpts, postOpts, putOpts, makeGetUrl } from './reqHelpers';
import { Map } from 'immutable';
import moment from 'moment';

export const NOTIFICATIONS_GET_REQUEST = 'NOTIFICATIONS_GET_REQUEST';
export const NOTIFICATIONS_GET_SUCCESS = 'NOTIFICATIONS_GET_SUCCESS';
export const NOTIFICATIONS_GET_FAILURE = 'NOTIFICATIONS_GET_FAILURE';

export const NOTIFICATIONS_MARK_READ_REQUEST = 'NOTIFICATION_MARK_READ_REQUEST';
export const NOTIFICATIONS_MARK_READ_SUCCESS = 'NOTIFICATION_MARK_READ_SUCCESS';
export const NOTIFICATIONS_MARK_READ_FAILURE = 'NOTIFICATION_MARK_READ_FAILURE';

export const NOTIFICATIONS_MARK_ALL_READ_REQUEST =
  'NOTIFICATIONS_MARK_ALL_READ_REQUEST';
export const NOTIFICATIONS_MARK_ALL_READ_SUCCESS =
  'NOTIFICATIONS_MARK_ALL_READ_SUCCESS';
export const NOTIFICATIONS_MARK_ALL_READ_FAILURE =
  'NOTIFICATIONS_MARK_ALL_READ_FAILURE';

export function markNotificationAsRead(id) {
  return {
    [CALL_API]: {
      endpoint: ApiRoutes.notifications_read_url(id),
      schema: Schemas.NOTIFICATION,
      types: [
        NOTIFICATIONS_MARK_READ_REQUEST,
        NOTIFICATIONS_MARK_READ_SUCCESS,
        NOTIFICATIONS_MARK_READ_FAILURE,
      ],
      opts: putOpts(),
    },
  };
}

export function markAllNotificationsAsRead() {
  return {
    [CALL_API]: {
      endpoint: ApiRoutes.notificationsReadAllUrl(),
      schema: Schemas.NOTIFICATION_ARR,
      types: [
        NOTIFICATIONS_MARK_ALL_READ_REQUEST,
        NOTIFICATIONS_MARK_ALL_READ_SUCCESS,
        NOTIFICATIONS_MARK_ALL_READ_FAILURE,
      ],
      opts: postOpts(),
    },
  };
}

function fetchNotifications(toNotificationId) {
  return {
    [CALL_API]: {
      endpoint: makeGetUrl(ApiRoutes.notificationsUrl(), { toNotificationId }),
      schema: Schemas.NOTIFICATION_COLL,
      types: [
        NOTIFICATIONS_GET_REQUEST,
        NOTIFICATIONS_GET_SUCCESS,
        NOTIFICATIONS_GET_FAILURE,
      ],
      opts: defaultOpts,
    },
  };
}

function shouldFetchNotifications(state) {
  const currentUserId = state.currentUser.data.id;
  const isFetching = state.notifications.get('isFetching', false);
  const notificationCount = state.entities.get('notification', Map())
    .filter((n) => n.get('userId') === currentUserId)
    .count();
  const totalCount = state.notifications
    .getIn(['data', 'totalCount'], +Infinity);

  return !isFetching && totalCount > notificationCount;
}

function getLastNotificationId(state) {
  const currentUserId = state.currentUser.data.id;
  const last = state.entities.get('notification', Map())
    .filter((n) => n.get('userId') === currentUserId)
    .toOrderedMap()
    .sortBy((n) => -moment(n.get('createdAt')))
    .last();

  return last && last.get('id');
}

export function getNotifications() {
  return (dispatch, getState) => {
    if (shouldFetchNotifications(getState())) {
      return dispatch(fetchNotifications(getLastNotificationId(getState())));
    }
  }
}
