import BaseStore from './_base';
import AppDispatcher from '../dispatchers/dispatcher';
import UserOnboardingConstants from '../constants/UserOnboardingConstants';

const userList = {
  users: [],
  isLoading: false,
  hasMore: false,
};

const actionMap = {
  [UserOnboardingConstants.USER_ONBOARDING_SET_USERS](payload) {
    userList.items = payload;
  },

  [UserOnboardingConstants.USER_ONBOARDING_SET_MORE](payload) {
    userList.hasMore = payload;
  },

  [UserOnboardingConstants.USER_ONBOARDING_SET_ISLOADING](payload) {
    userList.isLoading = payload;
  },
};

const UserOnboardingStore = Object.assign(
  new BaseStore(),
  {
    getState() {
      return userList;
    },
  }
);

UserOnboardingStore.dispatchToken = AppDispatcher.register((payload) => {
  const fn = actionMap[payload.action.type];
  if (!fn) {
    return;
  }

  fn(payload.action.payload);
  UserOnboardingStore.emitChange();
});


export default UserOnboardingStore;
