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
  },

  load(url, sinceEntryID, limit) {
    return Api.entry.load(url, sinceEntryID, limit)
      .fail((xhr) => {
        ErrorService.notifyErrorResponse('Загрузка записей', {
          method: 'EntryActionCreators.load(url, sinceEntryID, limit)',
          methodArguments: {url, sinceEntryID, limit},
          response: xhr.responseJSON
        });
      });
  },

  loadHtml(url) {
    return Api.entry.loadHtml(url)
      .fail((xhr) => {
        ErrorService.notifyErrorResponse('Загрузка записей в виде HTML', {
          method: 'EntryActionCreators.loadHtml(url)',
          methodArguments: {url},
          response: xhr.responseJSON
        });
      });
  }
};

export default EntryActionCreators;