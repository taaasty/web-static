import Api from '../api/api';
import ErrorService from '../../../shared/react/services/Error';
import NoticeService from '../services/Notice';
import AppDispatcher from '../dispatchers/dispatcher';
import {
  USER_ONBOARDING_SET_ISLOADING,
  USER_ONBOARDING_SET_RELATIONSHIPS,
} from '../constants/UserOnboardingConstants';

function setIsLoading(status) {
  AppDispatcher.handleServerAction({
    payload: status,
    type: USER_ONBOARDING_SET_ISLOADING,
  });
}

export function load() {
  setIsLoading(true);
  
  return Api.onboarding.load()
    .then((data) => {
      AppDispatcher.handleServerAction({
        payload: data.relationships,
        type: USER_ONBOARDING_SET_RELATIONSHIPS,
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
    .always(() => setIsLoading(false));
}
