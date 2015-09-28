/* global gon */
import ApiRoutes from '../../../shared/routes/api';
import AppDispatcher from '../dispatchers/dispatcher';
import FeedConstants from '../constants/FeedConstants';
import Pusher from 'pusher';

const pusherEvent = {
  NEW_ENTRY: 'new',
};

let _instance = void 0;

function FeedsUpdateService() {
  const pusher = new Pusher(gon.pusher.key, {
    authEndpoint: ApiRoutes.pusher_auth_url(),
    pong_timeout: 6000,
    unavailable_timeout: 2000,
  });

  const channelLive = pusher.subscribe('live');
  const channelBest = pusher.subscribe('best');

  channelLive.bind(pusherEvent.NEW_ENTRY, onNewLiveEntry);
  channelBest.bind(pusherEvent.NEW_ENTRY, onNewBestEntry);

  function onNewLiveEntry(payload) {
    AppDispatcher.handleServerAction({
      payload,
      type: FeedConstants.FEED_LIVE_NEW_ENTRY,
    });
  }

  function onNewBestEntry(payload) {
    AppDispatcher.handleServerAction({
      payload,
      type: FeedConstants.FEED_BEST_NEW_ENTRY,
    });
  }
}

export default function getSingletonInstance() {
  if (_instance) {
    return _instance;
  } else {
    _instance = FeedsUpdateService();
    return _instance;
  }
}
