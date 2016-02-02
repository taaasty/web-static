import Api from '../api/api';
import ErrorService from '../../../shared/react/services/Error';

let FeedActionCreators = {
  loadEntries(url, sinceEntryID, limit) {
    return Api.feed.loadEntries(url, sinceEntryID, limit)
      .fail((xhr) => {
        ErrorService.notifyErrorResponse('Загрузка записей из ленты', {
          method: 'FeedActionCreators.loadEntries(url, sinceEntryID, limit)',
          methodArguments: {url, sinceEntryID, limit},
          response: xhr.responseJSON
        });
      });
  }
};

export default FeedActionCreators;