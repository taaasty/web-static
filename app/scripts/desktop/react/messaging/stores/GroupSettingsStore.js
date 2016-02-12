import BaseStore from '../../stores/BaseStore';
import MessagingDispatcher from '../MessagingDispatcher';

let settings = {
  users: [],
  avatar_url: null,
  topic: null,
  admin: {},
};
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
      selectedIds = isNew ? [] : data.users.map((u) => u.id);
      isFetching = false;
      settings = data;
    },

    setSettings(data) {
      settings = data;
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
  case 'groupSettingsSetSettings':
    GroupSettingsStore.setSettings(action.payload);
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
  }
});

export default GroupSettingsStore;
