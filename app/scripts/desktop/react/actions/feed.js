import Api from '../api/api';
import ErrorService from '../../../shared/react/services/Error';

let FeedActionCreators = {
  loadLiveEntries(sinceEntryID, limit) {
    return Api.feed.loadLiveEntries(sinceEntryID, limit)
      .fail((xhr) => {
        ErrorService.notifyErrorResponse('Загрузка записей из прямого эфира', {
          method: 'FeedActionCreators.loadLiveEntries(sinceEntryID, limit)',
          methodArguments: {sinceEntryID, limit},
          response: xhr.responseJSON
        });
      });
  },

  loadFriendsEntries(sinceEntryID, limit) {
    return Api.feed.loadFriendsEntries(sinceEntryID, limit)
      .fail((xhr) => {
        ErrorService.notifyErrorResponse('Загрузка записей из подписок', {
          method: 'FeedActionCreators.loadFriendsEntries(sinceEntryID, limit)',
          methodArguments: {sinceEntryID, limit},
          response: xhr.responseJSON
        });
      });
  },

  loadBestEntries(sinceEntryID, limit) {
    return Api.feed.loadBestEntries(sinceEntryID, limit)
      .fail((xhr) => {
        ErrorService.notifyErrorResponse('Загрузка записей из лучшего', {
          method: 'FeedActionCreators.loadBestEntries(sinceEntryID, limit)',
          methodArguments: {sinceEntryID, limit},
          response: xhr.responseJSON
        });
      });
  },

  loadAnonymousEntries(sinceEntryID, limit) {
    return Api.feed.loadAnonymousEntries(sinceEntryID, limit)
      .fail((xhr) => {
        ErrorService.notifyErrorResponse('Загрузка записей из анонимок', {
          method: 'FeedActionCreators.loadAnonymousEntries(sinceEntryID, limit)',
          methodArguments: {sinceEntryID, limit},
          response: xhr.responseJSON
        });
      });
  },

  loadEntries(feedUrl) {
    return Api.feed.loadEntries(feedUrl);
  }
};

export default FeedActionCreators;