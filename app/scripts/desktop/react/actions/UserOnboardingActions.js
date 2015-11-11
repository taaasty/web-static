import Api from '../api/api';
import ErrorService from '../../../shared/react/services/Error';
import NoticeService from '../services/Notice';
import AppDispatcher from '../dispatchers/dispatcher';
import {
  USER_ONBOARDING_SET_ISLOADING,
  USER_ONBOARDING_SET_MORE,
  USER_ONBOARDING_SET_USERS,
} from '../constants/UserOnboardingConstants';

function setIsLoading(status) {
  AppDispatcher.handleServerAction({
    payload: status,
    type: USER_ONBOARDING_SET_ISLOADING,
  });
}

export function loadMore() {
  setIsLoading(true);

  return Api.onboarding.loadMore()
    .then((usersData) => {
      AppDispatcher.handleServerAction({
        payload: usersData.items,
        type: USER_ONBOARDING_SET_USERS,
      });
      AppDispatcher.handleServerAction({
        payload: usersData.has_more,
        type: USER_ONBOARDING_SET_MORE,
      });
    })
    .fail((xhr) => {
      NoticeService.errorResponse(xhr);
      ErrorService.notifyErrorResponse('Подгрузка новых пользователей', {
        method: 'UserOnboardingActions.loadMore()',
        methodArguments: {},
        response: xhr.responseJSON,
      });
    })
    .always(setIsLoading(false));
}
