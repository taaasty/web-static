import Api from '../api/api';
import ErrorService from '../../../shared/react/services/Error';
// TODO: RelationshipStore or smth similar

let RelationshipActionCreators = {
  unfollow(objectID, subjectID) {
    return Api.relationship.unfollow(objectID, subjectID)
      .fail((xhr) => {
        ErrorService.notifyErrorResponse('Отписка от тлога', {
          method: 'RelationshipActionCreators.unfollow(objectID, subjectID)',
          methodArguments: {objectID, subjectID},
          response: xhr.responseJSON
        });
      });
  },

  unfollowFromYourself(objectID, subjectID) {
    return Api.relationship.unfollowFromYourself(objectID, subjectID)
      .fail((xhr) => {
        ErrorService.notifyErrorResponse('Отписка тлога от себя', {
          method: 'RelationshipActionCreators.unfollowFromYourself(objectID, subjectID)',
          methodArguments: {objectID, subjectID},
          response: xhr.responseJSON
        });
      });
  },

  follow(objectID, subjectID) {
    return Api.relationship.follow(objectID, subjectID)
      .fail((xhr) => {
        ErrorService.notifyErrorResponse('Подписка на тлог', {
          method: 'RelationshipActionCreators.follow(objectID, subjectID)',
          methodArguments: {objectID, subjectID},
          response: xhr.responseJSON
        });
      });
  },

  cancel(objectID, subjectID) {
    return Api.relationship.cancel(objectID, subjectID)
      .fail((xhr) => {
        ErrorService.notifyErrorResponse('Отмена заявки на подписку на тлог', {
          method: 'RelationshipActionCreators.cancel(objectID, subjectID)',
          methodArguments: {objectID, subjectID},
          response: xhr.responseJSON
        });
      });
  },

  ignore(objectID, subjectID) {
    return Api.relationship.ignore(objectID, subjectID)
      .fail((xhr) => {
        ErrorService.notifyErrorResponse('Игнорирование тлога', {
          method: 'RelationshipActionCreators.ignore(objectID, subjectID)',
          methodArguments: {objectID, subjectID},
          response: xhr.responseJSON
        });
      });
  },

  approve(objectID, subjectID) {
    return Api.relationship.approve(objectID, subjectID)
      .fail((xhr) => {
        ErrorService.notifyErrorResponse('Подтверждение запроса на дружбу', {
          method: 'RelationshipActionCreators.approve(objectID, subjectID)',
          methodArguments: {objectID, subjectID},
          response: xhr.responseJSON
        });
      });
  },

  decline(objectID, subjectID) {
    return Api.relationship.decline(objectID, subjectID)
      .fail((xhr) => {
        ErrorService.notifyErrorResponse('Отказ запроса на дружбу', {
          method: 'RelationshipActionCreators.decline(objectID, subjectID)',
          methodArguments: {objectID, subjectID},
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