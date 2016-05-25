import keyMirror from 'keymirror';
import uri from 'urijs';

export default keyMirror({
  FEED_INITIAL_COUNTS: null,
  FEED_LIVE_NEW_ENTRY: null,
  FEED_LIVE_RESET: null,
  FEED_BEST_NEW_ENTRY: null,
  FEED_BEST_RESET: null,
  FEED_FRIENDS_NEW_ENTRY: null,
  FEED_FRIENDS_RESET: null,
  FEED_ANONYMOUS_NEW_ENTRY: null,
  FEED_ANONYMOUS_RESET: null,
  FEED_LIVE_FLOW_NEW_ENTRY: null,
  FEED_LIVE_FLOW_RESET: null,
});

//pusher channels
export const FEED_TYPE_ANONYMOUS = 'anonymous';
export const FEED_TYPE_LIVE = 'live';
export const FEED_TYPE_FRIENDS = 'friends';
export const FEED_TYPE_BEST = 'best';
export const FEED_TYPE_LIVE_FLOW = 'live_flow_entries';

//api routes
export const FEED_ENTRIES_API_TYPE_LIVE = 'FEED_ENTRIES_API_TYPE_LIVE';
export const FEED_ENTRIES_API_TYPE_MEDIA = 'FEED_ENTRIES_API_TYPE_MEDIA';
export const FEED_ENTRIES_API_TYPE_FLOWS = 'FEED_ENTRIES_API_TYPE_FLOWS';
export const FEED_ENTRIES_API_TYPE_ANONYMOUS = 'FEED_ENTRIES_API_TYPE_ANONYMOUS';
export const FEED_ENTRIES_API_TYPE_BEST = 'FEED_ENTRIES_API_TYPE_BEST';
export const FEED_ENTRIES_API_TYPE_FRIENDS = 'FEED_ENTRIES_API_TYPE_FRIENDS';
export const FEED_ENTRIES_API_TYPE_FRIENDS_MEDIA = 'FEED_ENTRIES_API_TYPE_FRIENDS_MEDIA';

//
export const navFilters = {
  live: [
    {
      title: 'feed.title.live.all',
      filterTitle: 'nav_filters.live.all',
      href: '/live',
      type: FEED_TYPE_LIVE,
      apiType: FEED_ENTRIES_API_TYPE_LIVE,
    },
    {
      title: 'feed.title.best.best',
      filterTitle: 'nav_filters.live.best',
      href: '/best?rating=best',
      type: FEED_TYPE_BEST,
      apiType: FEED_ENTRIES_API_TYPE_BEST,
    },
    {
      title: 'feed.title.live.media',
      filterTitle: 'nav_filters.live.media',
      href: '/media',
      type: FEED_TYPE_LIVE,
      apiType: FEED_ENTRIES_API_TYPE_MEDIA,
    },
    {
      title: 'feed.title.live.flows',
      filterTitle: 'nav_filters.live.flows',
      href: '/live/flows',
      type: FEED_TYPE_LIVE_FLOW,
      apiType: FEED_ENTRIES_API_TYPE_FLOWS,
    },
    {
      title: 'feed.title.live.anonymous',
      filterTitle: 'nav_filters.live.anonymous',
      href: '/live/anonymous',
      type: FEED_TYPE_ANONYMOUS,
      apiType: FEED_ENTRIES_API_TYPE_ANONYMOUS,
    },
  ],
  friends: [
    {
      title: 'feed.title.friends.all',
      filterTitle: 'nav_filters.friends.all',
      href: '/friends',
      type: FEED_TYPE_FRIENDS,
      apiType: FEED_ENTRIES_API_TYPE_FRIENDS,
    },
    {
      title: 'feed.title.friends.media',
      filterTitle: 'nav_filters.friends.media',
      href: '/friends/media',
      type: FEED_TYPE_FRIENDS,
      apiType: FEED_ENTRIES_API_TYPE_FRIENDS_MEDIA,
    },
  ],
  best: [
    {
      title: 'feed.title.best.best',
      filterTitle: 'nav_filters.best.best',
      href: '/best?rating=best',
      type: FEED_TYPE_BEST,
      apiType: FEED_ENTRIES_API_TYPE_BEST,
    },
    {
      title: 'feed.title.best.excellent',
      filterTitle: 'nav_filters.best.excellent',
      href: '/best?rating=excellent',
      type: FEED_TYPE_BEST,
      apiType: FEED_ENTRIES_API_TYPE_BEST,
    },
    {
      title: 'feed.title.best.well',
      filterTitle: 'nav_filters.best.well',
      href: '/best?rating=well',
      type: FEED_TYPE_BEST,
      apiType: FEED_ENTRIES_API_TYPE_BEST,
    },
    {
      title: 'feed.title.best.good',
      filterTitle: 'nav_filters.best.good',
      href: '/best?rating=good',
      type: FEED_TYPE_BEST,
      apiType: FEED_ENTRIES_API_TYPE_BEST,
    },
  ],
};

export const feedTypeMap = Object.keys(navFilters)
        .reduce((acc, section) => (
          navFilters[section].forEach(({ href, type, apiType }) => acc[uri(href).path()] = { section, type, apiType }), acc
        ), {});
export const feedTitleMap = Object.keys(navFilters)
        .reduce((acc, section) => (navFilters[section].forEach(({ href, title }, idx) => acc[href] = { title, idx }), acc), {});
export const feedBestTitleMap = navFilters.best
        .reduce((acc, { href, title }, idx) => (acc[uri(href).query(true).rating] = { title, idx }, acc), {});
