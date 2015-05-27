import Api from '../api/api';
import ErrorService from '../../../shared/react/services/Error';

let EntryActionCreators = {
  vote(entryID) {
    return Api.entry.vote(entryID)
      .fail((xhr) => {
        ErrorService.notifyErrorResponse('Голосование за запись', {
          method: 'EntryActionCreators.vote(entryID)',
          methodArguments: {entryID},
          response: xhr.responseJSON
        });
      });
  },

  accept(acceptUrl) {
    return Api.entry.accept(acceptUrl)
      .then(() => {
        NoticeService.notifySuccess('messages.entry_accept_success');
      })
      .fail((xhr) => {
        ErrorService.notifyErrorResponse('Принятие записи', {
          method: 'EntryActionCreators.accept(acceptUrl)',
          methodArguments: {acceptUrl},
          response: xhr.responseJSON
        });
      });
  },

  decline(declineUrl) {
    return Api.entry.decline(declineUrl)
      .then(() => {
        NoticeService.notifySuccess('messages.entry_decline_success');
      })
      .fail((xhr) => {
        ErrorService.notifyErrorResponse('Отклонение записи', {
          method: 'EntryActionCreators.decline(declineUrl)',
          methodArguments: {declineUrl},
          response: xhr.responseJSON
        });
      });
  }
};

export default EntryActionCreators;