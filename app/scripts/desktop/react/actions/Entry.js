/*global i18n */
import Api from '../api/api';
import ErrorService from '../../../shared/react/services/Error';
import NoticeService from '../services/Notice';

let EntryActionCreators = {
  vote(entryID) {
    return Api.entry.vote(entryID)
      .then((data) => {
        if (window.ga) {
          window.ga('send', 'event', 'UX', 'Like');
        }
        return data;
      })
      .fail((xhr) => {
        ErrorService.notifyErrorResponse('Голосование за запись', {
          method: 'EntryActionCreators.vote(entryID)',
          methodArguments: {entryID},
          response: xhr.responseJSON,
        });
      });
  },
  addToFavorites(entryID) {
    return Api.entry.addToFavorites(entryID)
      .then((data) => {
        if (window.ga) {
          window.ga('send', 'event', 'UX', 'AddToFavorite');
        }
        return data;
      })
      .fail((xhr) => {
        NoticeService.errorResponse(xhr);
        ErrorService.notifyErrorResponse('Добавление записи в избранное', {
          method: 'EntryActionCreators.addToFavorites(entryID)',
          methodArguments: {entryID},
          response: xhr.responseJSON,
        });
      });
  },
  removeFromFavorites(entryID) {
    return Api.entry.removeFromFavorites(entryID)
      .fail((xhr) => {
        NoticeService.errorResponse(xhr);
        ErrorService.notifyErrorResponse('Удаление записи из избранного', {
          method: 'EntryActionCreators.removeFromFavorites(entryID)',
          methodArguments: {entryID},
          response: xhr.responseJSON,
        });
      });
  },
  addToWatching(entryID) {
    return Api.entry.addToWatching(entryID)
      .fail((xhr) => {
        NoticeService.errorResponse(xhr);
        ErrorService.notifyErrorResponse('Подписка на комментарии к посту', {
          method: 'EntryActionCreators.addToWatching(entryID)',
          methodArguments: {entryID},
          response: xhr.responseJSON,
        });
      });
  },
  removeFromWatching(entryID) {
    return Api.entry.removeFromWatching(entryID)
      .fail((xhr) => {
        NoticeService.errorResponse(xhr);
        ErrorService.notifyErrorResponse('Отписка от комментариев к посту', {
          method: 'EntryActionCreators.removeFromWatching(entryID)',
          methodArguments: {entryID},
          response: xhr.responseJSON,
        });
      });
  },
  report(entryID) {
    return Api.entry.report(entryID)
      .then(() => {
        NoticeService.notifySuccess(i18n.t('report_entry_success'));
      })
      .fail((xhr) => {
        NoticeService.errorResponse(xhr);
        ErrorService.notifyErrorResponse('Жалоба на пост', {
          method: 'EntryActionCreators.report(entryID)',
          methodArguments: {entryID},
          response: xhr.responseJSON,
        });
      });
  },
  delete(entryID, tlogID) {
    return Api.entry.delete(entryID, tlogID)
      .then(() => {
        NoticeService.notifySuccess(i18n.t('delete_entry_success'));
      })
      .fail((xhr) => {
        NoticeService.errorResponse(xhr);
        ErrorService.notifyErrorResponse('Удаление поста', {
          method: 'EntryActionCreators.delete(entryID, tlogID)',
          methodArguments: {entryID, tlogID},
          response: xhr.responseJSON,
        });
      });
  },
  repost(entryID, tlogID) {
    return Api.entry.repost(entryID, tlogID)
      .then(() => {
        if (window.ga) {
          window.ga('send', 'event', 'UX', 'Repost');
        }
        NoticeService.notifySuccess(i18n.t('repost_entry_success'));
      })
      .fail((xhr) => {
        NoticeService.errorResponse(xhr);
        ErrorService.notifyErrorResponse('Репост поста', {
          method: 'EntryActionCreators.repost(entryID, tlogID)',
          methodArguments: {entryID, tlogID},
          response: xhr.responseJSON,
        });
      });
  },
  accept(acceptUrl) {
    return Api.entry.accept(acceptUrl)
      .then(() => {
        NoticeService.notifySuccess(i18n.t('messages.entry_accept_success'));
      })
      .fail((xhr) => {
        ErrorService.notifyErrorResponse('Принятие записи', {
          method: 'EntryActionCreators.accept(acceptUrl)',
          methodArguments: {acceptUrl},
          response: xhr.responseJSON,
        });
      });
  },
  decline(declineUrl) {
    return Api.entry.decline(declineUrl)
      .then(() => {
        NoticeService.notifySuccess(i18n.t('messages.entry_decline_success'));
      })
      .fail((xhr) => {
        ErrorService.notifyErrorResponse('Отклонение записи', {
          method: 'EntryActionCreators.decline(declineUrl)',
          methodArguments: {declineUrl},
          response: xhr.responseJSON,
        });
      });
  },
  load(url, data) {
    return Api.entry.load(url, data)
      .fail((xhr) => {
        ErrorService.notifyErrorResponse('Загрузка записей', {
          method: 'EntryActionCreators.load(url, data)',
          methodArguments: {url, data},
          response: xhr.responseJSON,
        });
      });
  },
  loadHtml(url) {
    return Api.entry.loadHtml(url)
      .fail((xhr) => {
        ErrorService.notifyErrorResponse('Загрузка записей в виде HTML', {
          method: 'EntryActionCreators.loadHtml(url)',
          methodArguments: {url},
          response: xhr.responseJSON,
        });
      });
  },
  createComment(entryID, text) {
    return Api.entry.createComment(entryID, text)
      .fail((xhr) => {
        NoticeService.errorResponse(xhr);
        ErrorService.notifyErrorResponse('Создание комментария к записи', {
          method: 'EntryActionCreators.createComment(entryID, text)',
          methodArguments: {entryID, text},
          response: xhr.responseJSON,
        });
      });
  },
  reportComment(commentID) {
    return Api.entry.reportComment(commentID)
      .then(() => {
        NoticeService.notifySuccess(i18n.t('report_comment_success'));
      })
      .fail((xhr) => {
        NoticeService.errorResponse(xhr);
        ErrorService.notifyErrorResponse('Жалоба на комментарий', {
          method: 'EntryActionCreators.reportComment(commentID)',
          methodArguments: {commentID},
          response: xhr.responseJSON,
        });
      });
  },
  editComment(commentID, text) {
    return Api.entry.editComment(commentID, text)
      .fail((xhr) => {
        NoticeService.errorResponse(xhr);
        ErrorService.notifyErrorResponse('Редактирования комментария к записи', {
          method: 'EntryActionCreators.editComment(commentID, text)',
          methodArguments: {commentID, text},
          response: xhr.responseJSON,
        });
      });
  },
  deleteComment(commentID) {
    return Api.entry.deleteComment(commentID)
      .then(() => {
        NoticeService.notifySuccess(i18n.t('delete_comment_success'));
      })
      .fail((xhr) => {
        NoticeService.errorResponse(xhr);
        ErrorService.notifyErrorResponse('Удаление комментария', {
          method: 'EntryActionCreators.deleteComment(commentID)',
          methodArguments: {commentID},
          response: xhr.responseJSON,
        });
      });
  },
};

export default EntryActionCreators;
