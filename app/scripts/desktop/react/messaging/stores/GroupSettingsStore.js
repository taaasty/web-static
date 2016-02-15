import BaseStore from '../../stores/BaseStore';
import MessagingDispatcher from '../MessagingDispatcher';

const initSettings = {
  users: [],
  avatar: null,
  topic: '',
  admin: {},
};
let settings = initSettings;
let isFetching = false;
let selectedIds = [];

const GroupSettingsStore = Object.assign(
  new BaseStore(),
  {
    getState() {
      return {
        settings,
        isFetching,
        selectedIds,
      };
    },

    init(data) {
      const isNew = !data.id;
      selectedIds = isNew
        ? []
        : data.users.filter((u) => data.users_left.indexOf(u.id) < 0);
      isFetching = false;
      settings = { ...initSettings, ...data };
    },

    reset() {
      settings = initSettings;
    },

    updateSettings(data) {
      settings = { ...settings, ...data };
    },

    fetching(flag) {
      isFetching = flag;
    },

    addUser(user) {
      if (!settings.users.filter((u) => u.id === user.id).length) {
        settings.users = [ ...settings.users, user ];
      }
    },

    toggleSelectedId(id) {
      if (selectedIds.indexOf(id) > -1) {
        selectedIds = selectedIds.filter((i) => i !== id );
      } else {
        selectedIds = [ ...selectedIds, id ];
      }
    },
  }
);

GroupSettingsStore.dispatchToken = MessagingDispatcher.register(({ action }) => {
  switch (action.type) {
  case 'groupSettingsInit':
    GroupSettingsStore.init(action.payload);
    GroupSettingsStore.emitChange();
    break;
  case 'groupSettingsSetState':
    GroupSettingsStore.setCurrentState(action.payload);
    GroupSettingsStore.emitChange();
    break;
  case 'groupSettingsUpdateSettings':
    GroupSettingsStore.updateSettings(action.payload);
    GroupSettingsStore.emitChange();
    break;
  case 'groupSettingsToggleSelectedId':
    GroupSettingsStore.toggleSelectedId(action.payload);
    GroupSettingsStore.emitChange();
    break;
  case 'groupSettingsAddUser':
    GroupSettingsStore.addUser(action.payload);
    GroupSettingsStore.emitChange();
    break;
  case 'groupSettingsRequest':
    GroupSettingsStore.fetching(action.payload);
    GroupSettingsStore.emitChange();
    break;
  case 'closeGroupSettings':
    GroupSettingsStore.reset();
    GroupSettingsStore.emitChange();
    break;
  }
});

export default GroupSettingsStore;
