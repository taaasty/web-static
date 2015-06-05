import Api from '../api/api';
import ErrorService from '../../../shared/react/services/Error';
// TODO: RelationshipStore or smth similar

let RelationshipActionCreators = {
  unfollow(tlogID) {
    return Api.relationship.unfollow(tlogID)
      .fail((xhr) => {
        ErrorService.notifyErrorResponse('Отписка от тлога', {
          method: 'RelationshipActionCreators.unfollow(tlogID)',
          methodArguments: {tlogID},
          response: xhr.responseJSON
        });
      });
  },

  follow(tlogID) {
    return Api.relationship.follow(tlogID)
      .fail((xhr) => {
        ErrorService.notifyErrorResponse('Подписка на тлог', {
          method: 'RelationshipActionCreators.follow(tlogID)',
          methodArguments: {tlogID},
          response: xhr.responseJSON
        });
      });
  },

  cancel(tlogID) {
    return Api.relationship.cancel(tlogID)
      .fail((xhr) => {
        ErrorService.notifyErrorResponse('Отмена заявки на подписку на тлог', {
          method: 'RelationshipActionCreators.cancel(tlogID)',
          methodArguments: {tlogID},
          response: xhr.responseJSON
        });
      });
  },

  load(url, sincePosition, limit) {
    return Api.relationship.load(url, sincePosition, limit)
      .fail((xhr) => {
        ErrorService.notifyErrorResponse('Загрузка списка отношений', {
          method: 'RelationshipActionCreators.load(url, sincePosition, limit)',
          methodArguments: {url, sincePosition, limit},
          response: xhr.responseJSON
        });
      });
  }
};

export default RelationshipActionCreators;