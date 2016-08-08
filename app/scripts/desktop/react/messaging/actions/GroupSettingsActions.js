import ApiRoutes from '../../../../shared/routes/api';
import { CALL_API, Schemas } from '../../middleware/api';
import { postOpts } from '../../actions/reqHelpers';
import { prepareFormData } from '../../../../shared/helpers/api';

export const MSG_GROUP_SAVE_REQUEST = 'MSG_GROUP_SAVE_REQUEST';
export const MSG_GROUP_SAVE_SUCCESS = 'MSG_GROUP_SAVE_SUCCESS';
export const MSG_GROUP_SAVE_FAILURE = 'MSG_GROUP_SAVE_FAILURE';

export const MSG_GROUP_ADD_USER = 'MSG_GROUP_ADD_USER';
export const MSG_GROUP_SELECT_USER = 'MSG_GROUP_SELECT_USER';
export const MSG_GROUP_UNSELECT_USER = 'MSG_GROUP_UNSELECT_USER';
export const MSG_GROUP_RESET = 'MSG_GROUP_RESET';

export const MSG_GROUP_UPDATE = 'MSG_GROUP_UPDATE';
export const MSG_GROUP_INIT = 'MSG_GROUP_INIT';

export function initGroupSettings(data) {
  return {
    type: MSG_GROUP_INIT,
    data,
  };
}

export function updateGroupSettings(data) {
  return {
    type: MSG_GROUP_UPDATE,
    data,
  };
}

export function saveGroupSettings(data) {
  const endpoint = data.id ?
    ApiRoutes.messengerConversationsById(data.id) :
    ApiRoutes.messengerConversationsByUserIds();
  const formData = prepareFormData(data);

  return {
    [CALL_API]: {
      endpoint,
      schema: Schemas.CONVERSATION,
      types: [
        MSG_GROUP_SAVE_REQUEST,
        MSG_GROUP_SAVE_SUCCESS,
        MSG_GROUP_SAVE_FAILURE,
      ],
      opts: postOpts(formData),
    },
  };
}

export function addGroupUser(user) {
  return (dispatch) => {
    dispatch({
      type: MSG_GROUP_ADD_USER,
      user,
    });

    return dispatch(selectUser(user));
  };
}

function selectUser(user) {
  return {
    type: MSG_GROUP_SELECT_USER,
    user,
  };
}

export function unselectUser(user) {
  return {
    type: MSG_GROUP_UNSELECT_USER,
    user,
  };
}

export function toggleSelectedUser(user) {
  return (dispatch, getState) => {
    const isUserSelected = getState()
      .msg
      .groupSettings
      .get('selected')
      .has(user.get('id'));

    return isUserSelected ?
      dispatch(unselectUser(user)) :
      dispatch(selectUser(user));
  };
}

export function resetGroupSettings() {
  return {
    type: MSG_GROUP_RESET,
  };
}

/*

    init(data) {
      const isNew = !data.id;
      selectedIds = isNew
        ? []
        : data.users
            .filter((u) => data.users_left.indexOf(u.id) < 0)
            .map((u) => u.id);
      isFetching = false;
      settings = { ...initSettings, ...data };
      settings = { ...settings, users: sortUsers(settings.users, selectedIds) };
    },
*/
