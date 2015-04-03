import Api from '../api/api';

let FeedActionCreators = {
  loadEntries(feedUrl) {
    return Api.feed.loadEntries(feedUrl);
  }
};

export default FeedActionCreators;