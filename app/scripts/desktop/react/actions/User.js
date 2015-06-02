import Api from '../api/api';
import ErrorService from '../../../shared/react/services/Error';

let UserActionCreators = {
  predict(query, limit) {
    return Api.user.predict(query, limit)
      .fail((xhr) => {
        ErrorService.notifyErrorResponse('Получение списка пользователей по слагу', {
          method: 'UserActionCreators.predict(query, limit)',
          methodArguments: {query, limit},
          response: xhr.responseJSON
        });
      });
  }
};

export default UserActionCreators;