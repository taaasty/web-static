/*global gon */
import ApiRoutes from '../../../shared/routes/api';
import * as FeedsUpdateActions from '../actions/FeedsUpdateActions';
import Pusher from 'pusher';

const pusherEvent = {
  NEW_ENTRY: 'new_entry',
};

let _instance = void 0;

function FeedsUpdateService(user={}) {
  if (!(gon.pusher && gon.pusher.key)) {
    return;
  }

  const userToken = user.api_key && user.api_key.access_token;
  const authOptions = userToken
        ? {
            auth: {
              headers: {
                'X-User-Token': userToken,
              },
            },
          }
        : null;

  const pusher = new Pusher(gon.pusher.key, {
    authEndpoint: ApiRoutes.pusher_auth_url(),
    pong_timeout: 6000,
    unavailable_timeout: 2000,
    ...authOptions,
  });

  const channelLive = pusher.subscribe('live');
  const channelBest = pusher.subscribe('best');

  channelLive.bind(pusherEvent.NEW_ENTRY, FeedsUpdateActions.addLiveEntry);
  channelBest.bind(pusherEvent.NEW_ENTRY, FeedsUpdateActions.addBestEntry);

  if (userToken && user.id) {
    const channelFriends = pusher.subscribe(`private-${user.id}-friends`);

    channelFriends.bind(pusherEvent.NEW_ENTRY, FeedsUpdateActions.addFriendsEntry);
  }
}

export default function getSingletonInstance(...args) {
  if (_instance) {
    return _instance;
  } else {
    _instance = FeedsUpdateService(...args);
    return _instance;
  }
}
