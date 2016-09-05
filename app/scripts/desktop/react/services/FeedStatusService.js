/*global gon */
import ApiRoutes from '../../../shared/routes/api';
import Pusher from 'pusher';
import {
  feedAnonymousNewEntry,
  feedBestNewEntry,
  feedFriendsNewEntry,
  feedLiveNewEntry,
  feedLiveFlowNewEntry,
} from '../actions/FeedStatusActions';

const PUSHER_NEW_ENTRY = 'new_entry';

export function feedStatusConnect(user, store) {
  if (!(gon.pusher && gon.pusher.key)) {
    return;
  }

  const userToken = user.apiKey && user.apiKey.accessToken;
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
  const channelAnonymous = pusher.subscribe('anonymous');
  const channelLiveFlow = pusher.subscribe('live_flow_entries');

  channelLive.bind(PUSHER_NEW_ENTRY, (data) => store.dispatch(feedLiveNewEntry(data)));
  channelBest.bind(PUSHER_NEW_ENTRY, (data) => store.dispatch(feedBestNewEntry(data)));
  channelAnonymous.bind(PUSHER_NEW_ENTRY, (data) => store.dispatch(feedAnonymousNewEntry(data)));
  channelLiveFlow.bind(PUSHER_NEW_ENTRY, (data) => store.dispatch(feedLiveFlowNewEntry(data)));

  if (userToken && user.id) {
    const channelFriends = pusher.subscribe(`private-${user.id}-friends`);

    channelFriends.bind(PUSHER_NEW_ENTRY, (data) => store.dispatch(feedFriendsNewEntry(data)));
  }
}
