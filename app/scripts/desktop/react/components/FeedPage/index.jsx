/*global i18n */
import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import FeedPageBody from './FeedPageBody';
import FeedFilters from '../FeedFilters';
import UnreadLoadButton from './UnreadLoadButton';
import Routes from '../../../../shared/routes/routes';
import { setBodyLayoutClassName } from '../../helpers/htmlHelpers';
import {
  FEED_TYPE_ANONYMOUS,
  FEED_TYPE_LIVE,
  FEED_TYPE_FRIENDS,
  FEED_TYPE_BEST,
  FEED_TYPE_LIVE_FLOW,
  feedDataByUri,
  feedTitleMap,
  feedBestTitleMap,
  navFilters,
} from '../../constants/FeedConstants';
import {
  feedEntriesViewStyle,
  getFeedEntries,
  getFeedEntriesIfNeeded,
  resetFeedEntries,
  setVisibleFeedEntries,
} from '../../actions/FeedEntriesActions';
import {
  feedAnonymousReset,
  feedBestReset,
  feedFriendsReset,
  feedLiveFlowReset,
  feedLiveReset,
} from '../../actions/FeedStatusActions';
import {
  fetchAds,
  setAd,
  composeAdsId,
  isAdsId,
} from '../../actions/AdsActions';
import { ENTRY_PINNED_STATE } from '../../constants/EntryConstants';
import { sendCategory } from '../../../../shared/react/services/Sociomantic';
import { onlyUpdateForKeys } from 'recompose';
import { Map } from 'immutable';

const BUTTON_OFFSET = 62;
const typeMap = {
  [FEED_TYPE_ANONYMOUS]: {
    counter: 'unreadAnonymousCount',
    reset: 'feedAnonymousReset',
    href: Routes.live_anonymous_feed_path(),
  },
  [FEED_TYPE_BEST]: {
    counter: 'unreadBestCount',
    reset: 'feedBestReset',
    href: Routes.best_feed_path(),
  },
  [FEED_TYPE_FRIENDS]: {
    counter: 'unreadFriendsCount',
    reset: 'feedFriendsReset',
    href: Routes.friends_feed_path(),
  },
  [FEED_TYPE_LIVE_FLOW]: {
    counter: 'unreadLiveFlowCount',
    reset: 'feedLiveFlowReset',
    href: Routes.live_flows_feed_path(),
  },
  [FEED_TYPE_LIVE]: {
    counter: 'unreadLiveCount',
    reset: 'feedLiveReset',
    href: Routes.live_feed_path(),
  },
};

const PREPEND_LOAD_LIMIT = 30;
const VISIBLE_INITIAL = 40;
const VISIBLE_APPEND_THRESHOLD = 60; // if less than threshold entries then load more
const VISIBLE_APPEND_STEP = 15;
const APPEND_LOAD_LIMIT = 100;

class FeedPage extends Component {
  componentWillMount() {
    const {
      feedStatus,
      fetchAds,
      getFeedEntriesIfNeeded,
      location,
      setAd,
      setVisibleFeedEntries,
    } = this.props;
    const feedType = this.feedType(location);
    const type = typeMap[feedType];
    const params = feedDataByUri(location);

    this.setViewStyle(this.props);
    const willGet = getFeedEntriesIfNeeded(params);
    setVisibleFeedEntries(VISIBLE_INITIAL);
    fetchAds();

    if (type) {
      if (!willGet && feedStatus[type.counter] > 0) {
        this.prependEntries(params, feedStatus[type.counter]);
      }
      this.props[type.reset].call(void 0);
      sendCategory(feedType);
      setAd();
    }
  }
  componentDidMount() {
    setBodyLayoutClassName('layout--feed');
  }
  componentWillReceiveProps(nextProps) {
    const {
      getFeedEntriesIfNeeded,
      setVisibleFeedEntries,
      isAdsFetching,
      setAd,
    } = this.props;
    const {
      isAdsFetching: nextIsAdsFetching,
    } = nextProps;
    const nextParams = feedDataByUri(nextProps.location);

    this.setViewStyle(nextProps);
    const willGet = getFeedEntriesIfNeeded(nextParams);
    const nextFeedType = this.feedType(nextProps.location);
    const type = typeMap[nextFeedType];

    if (this.feedType(this.props.location) !== nextFeedType) {
      if (type) {
        if (!willGet && nextProps.feedStatus[type.counter] > 0) {
          this.prependEntries(nextParams, nextProps.feedStatus[type.counter]);
        }
        this.props[type.reset].call(void 0);
        sendCategory(nextFeedType);
      }
    } else if (willGet && type) {
      this.props[type.reset].call(void 0);
    }

    if (isAdsFetching !== nextIsAdsFetching && !nextIsAdsFetching) {
      setAd();
    }

    if (willGet) {
      setVisibleFeedEntries(VISIBLE_INITIAL);
    }
  }
  componentWillUnmount() {
    this.props.setVisibleFeedEntries(VISIBLE_INITIAL);
  }
  feedType(location) {
    return (feedDataByUri(location) || {}).type;
  }
  setViewStyle({ feedEntries: { viewStyle }, location: { query } }) {
    if (query && query.style && viewStyle !== query.style) {
      this.props.feedEntriesViewStyle(query.style);
    }
  }
  handleClickUnreadButton(count) {
    const {
      getFeedEntries,
      location,
      resetFeedEntries,
      setVisibleFeedEntries,
     } = this.props;
    const type = typeMap[this.feedType(location)];
    const shouldReset = count > PREPEND_LOAD_LIMIT;
    const params = feedDataByUri(location);

    if (count > 0) {
      if (shouldReset) {
        resetFeedEntries();
        getFeedEntries(params)
          .then(() => setVisibleFeedEntries(VISIBLE_INITIAL))
          .then(this.props[type.reset]);
      } else {
        this.prependEntries(params, count)
          .then(this.props[type.reset]);
      }
    }

    return null;
  }
  appendEntries() {
    const {
      feedEntries: {
        data: {
          items,
          nextSinceEntryId,
        },
        visible,
      },
      getFeedEntries,
      location,
      setVisibleFeedEntries,
    } = this.props;

    if (items.length - visible <= VISIBLE_APPEND_THRESHOLD) {
      getFeedEntries(
        feedDataByUri(location),
        { sinceId: nextSinceEntryId, limit: APPEND_LOAD_LIMIT }
      );
    }

    setVisibleFeedEntries(visible + VISIBLE_APPEND_STEP);
  }
  prependEntries(params, limit) {
    const {
      getFeedEntries,
      tillId,
    } = this.props;

    return tillId
      ? getFeedEntries(params, { limit, tillId })
      : Promise.reject();
  }
  renderButton({ count, href, isFetching }) {
    return (
      <UnreadLoadButton
        count={count}
        href={href}
        isLoading={!!isFetching}
        offset={BUTTON_OFFSET}
        onClick={this.handleClickUnreadButton.bind(this, count)}
      />
    );
  }
  render() {
    const {
      currentUser,
      feedEntries,
      feedStatus,
      location,
    } = this.props;
    const { isFetching, viewStyle, visible } = feedEntries;
    const { section, type, rating, query } = feedDataByUri(location);
    const navFilterItems = navFilters[section];
    const { idx, title } = type === FEED_TYPE_BEST
            ? feedBestTitleMap[rating]
            : feedTitleMap[location.pathname];
    const { counter, href } = typeMap[type];
    const count = feedStatus[counter];
    const visibleFeedEntries = Object.assign({}, feedEntries, {
      data: Object.assign({}, feedEntries.data, {
        items: feedEntries.data.items.slice(0, visible),
      }),
    });

    return (
      <div className="page__inner">
        <Helmet title={i18n.t(title)} />
        <div className="page__paper">
          <FeedPageBody
            appendFeedEntries={this.appendEntries.bind(this)}
            currentUser={currentUser}
            feedEntries={visibleFeedEntries}
            feedType={type}
            location={location}
          >
            <FeedFilters
              location={location}
              navFiltersActive={idx}
              navFiltersItems={navFilterItems}
              navViewMode
              viewMode={viewStyle}
            >
              {!query && this.renderButton({ count, href, isFetching })}
            </FeedFilters>
          </FeedPageBody>
        </div>
      </div>
    );
  }
}

FeedPage.displayName = 'FeedPage';

FeedPage.defaultProps = {
  currentUser: { data: {} },
};

FeedPage.propTypes = {
  appStats: PropTypes.object.isRequired,
  currentUser: PropTypes.object,
  feedAnonymousReset: PropTypes.func.isRequired,
  feedBestReset: PropTypes.func.isRequired,
  feedEntries: PropTypes.object.isRequired,
  feedEntriesViewStyle: PropTypes.func.isRequired,
  feedFriendsReset: PropTypes.func.isRequired,
  feedLiveFlowReset: PropTypes.func.isRequired,
  feedLiveReset: PropTypes.func.isRequired,
  feedStatus: PropTypes.object.isRequired,
  fetchAds: PropTypes.func.isRequired,
  getFeedEntries: PropTypes.func.isRequired,
  getFeedEntriesIfNeeded: PropTypes.func.isRequired,
  isAdsFetching: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
  resetFeedEntries: PropTypes.func.isRequired,
  setAd: PropTypes.func.isRequired,
  setVisibleFeedEntries: PropTypes.func.isRequired,
  tillId: PropTypes.number,
};

export default connect(
  (state) => {
    const {
      ads,
      appStats,
      currentUser,
      entities,
      feedEntries,
      feedStatus,
    } = state;
    const adsCurrentId = ads.get('currentId');
    const adsTime = ads.get('time');
    const isAdsFetching = ads.get('isFetching', false);
    const sortedEntries = entities
            .get('entry')
            .filter((e, key) => (feedEntries.data.items || []).indexOf(Number(key)) > -1)
            .set(composeAdsId(adsCurrentId), Map({ id: adsCurrentId, createdAt: adsTime }))
            .filterNot((e, key) => isAdsId(key) && !e.get('id'))
            .toOrderedMap()
            .sortBy((e) => 0 - (new Date(e.get('createdAt')).valueOf()) -
                    (e.get('fixedState') === ENTRY_PINNED_STATE ? 1e12 : 0))
            .keySeq()
            .map(k => isAdsId(k) ? k : Number(k))
            .toArray();
    const tillId = Math.max(...feedEntries.data.items);
    const sortedFeedEntries = Object.assign(
      {},
      feedEntries,
      { data: Object.assign({}, feedEntries.data, { items: sortedEntries }) }
    );

    return {
      isAdsFetching,
      currentUser,
      feedStatus,
      tillId,
      appStats: appStats.data,
      feedEntries: sortedFeedEntries,
    };
  },
  {
    feedAnonymousReset,
    feedBestReset,
    feedEntriesViewStyle,
    feedFriendsReset,
    feedLiveFlowReset,
    feedLiveReset,
    fetchAds,
    getFeedEntries,
    getFeedEntriesIfNeeded,
    resetFeedEntries,
    setAd,
    setVisibleFeedEntries,
  }
)(onlyUpdateForKeys([
  'isAdsFetching',
  'appStats',
  'currentUser',
  'feedEntries',
  'feedStatus',
  'location',
  'tillId',
])(FeedPage));
