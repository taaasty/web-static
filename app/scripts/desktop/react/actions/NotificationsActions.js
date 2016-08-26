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

export const NOTIFICATION_MY = 'ActivityNotification';
export const NOTIFICATION_FRIEND = 'FriendActivityNotification';

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

function fetchNotifications(params) {
  return {
    [CALL_API]: {
      endpoint: makeGetUrl(ApiRoutes.notificationsUrl(), params),
      schema: Schemas.NOTIFICATION_COLL,
      types: [
        NOTIFICATIONS_GET_REQUEST,
        NOTIFICATIONS_GET_SUCCESS,
        NOTIFICATIONS_GET_FAILURE,
      ],
      opts: defaultOpts,
    },
    filter: params.type,
  };
}

export function getFilterNotifications(state, filter) {
  const currentUserId = state.currentUser.data.id;

  return state.entities.get('notification', Map())
    .filter((n) => n.get('userId') === currentUserId &&
      n.get('type') === filter
    )
    .toOrderedMap()
    .sortBy((n) => -moment(n.get('createdAt')));
}

function shouldFetchNotifications(state, filter) {
  const isFetching = state.notifications.get('isFetching', false);
  const notificationCount = getFilterNotifications(state, filter)
    .count();
  const totalCount = state.notifications
    .getIn(['totalCount', filter], +Infinity);

  return !isFetching && totalCount > notificationCount;
}

export function prependNotifications(filter) {
  return (dispatch, getState) => {
    const first = getFilterNotifications(getState(), filter)
      .first();
    const fromNotificationId = first && first.get('id');

    return dispatch(fetchNotifications({
      fromNotificationId,
      type: filter,
    }));
  };
}

export function getNotifications(filter) {
  return (dispatch, getState) => {
    if (shouldFetchNotifications(getState(), filter)) {
      const last = getFilterNotifications(getState(), filter)
        .last();
      const toNotificationId = last && last.get('id');

      return dispatch(fetchNotifications({
        toNotificationId,
        type: filter,
      }));
    }
  };
}
