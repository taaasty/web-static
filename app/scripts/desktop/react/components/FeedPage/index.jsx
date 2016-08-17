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
} from '../../actions/FeedEntriesActions';
import {
  feedAnonymousReset,
  feedBestReset,
  feedFriendsReset,
  feedLiveFlowReset,
  feedLiveReset,
} from '../../actions/FeedStatusActions';
import { ENTRY_PINNED_STATE } from '../../constants/EntryConstants';
import { sendCategory } from '../../../../shared/react/services/Sociomantic';

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
const APPEND_LOAD_LIMIT = 15;

class FeedPage extends Component {
  componentWillMount() {
    const { feedStatus, getFeedEntriesIfNeeded, location } = this.props;
    const feedType = this.feedType(location);
    const type = typeMap[feedType];
    const params = feedDataByUri(location);

    this.setViewStyle(this.props);
    const willGet = getFeedEntriesIfNeeded(params);

    if (type) {
      if (!willGet && feedStatus[type.counter] > 0) {
        this.prependEntries(params, feedStatus[type.counter]);
      }
      this.props[type.reset].call(void 0);
      sendCategory(feedType);
    }
  }
  componentDidMount() {
    setBodyLayoutClassName('layout--feed');
  }
  componentWillReceiveProps(nextProps) {
    const { getFeedEntriesIfNeeded } = this.props;
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
     } = this.props;
    const type = typeMap[this.feedType(location)];
    const shouldReset = count > PREPEND_LOAD_LIMIT;
    const params = feedDataByUri(location);

    if (count > 0) {
      if (shouldReset) {
        resetFeedEntries();
        getFeedEntries(params)
          .then(this.props[type.reset]);
      } else {
        this.prependEntries(params, count)
          .then(this.props[type.reset]);
      }
    }

    return null;
  }
  appendEntries() {
    const { feedEntries: { data: { nextSinceEntryId } }, getFeedEntries, location } = this.props;

    return getFeedEntries(
      feedDataByUri(location),
      { sinceId: nextSinceEntryId, limit: APPEND_LOAD_LIMIT }
    );
  }
  prependEntries(params, limit) {
    const { getFeedEntries, tillId } = this.props;

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
    const { currentUser, feedEntries, feedStatus, location } = this.props;
    const { isFetching, viewStyle } = feedEntries;
    const { section, type, rating, query } = feedDataByUri(location);
    const navFilterItems = navFilters[section].map(({ href, filterTitle }) => ({ href, title: i18n.t(filterTitle) }));
    const { idx, title } = type === FEED_TYPE_BEST
            ? feedBestTitleMap[rating]
            : feedTitleMap[location.pathname];
    const { counter, href } = typeMap[type];
    const count = feedStatus[counter];

    return (
      <div className="page__inner">
        <Helmet title={i18n.t(title)} />
        <div className="page__paper">
          <FeedPageBody
            appendFeedEntries={this.appendEntries.bind(this)}
            currentUser={currentUser}
            feedEntries={feedEntries}
            feedType={type}
            location={location}
          >
            <FeedFilters
              location={location}
              navFilters={{ active: idx, items: navFilterItems }}
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
  getFeedEntries: PropTypes.func.isRequired,
  getFeedEntriesIfNeeded: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  resetFeedEntries: PropTypes.func.isRequired,
  tillId: PropTypes.number,
};

export default connect(
  (state) => {
    const { appStats, currentUser, entities, feedEntries, feedStatus } = state;
    const sortedEntries = entities
            .get('entry')
            .filter((e, key) => (feedEntries.data.items || []).indexOf(Number(key)) > -1)
            .toOrderedMap()
            .sortBy((e) => 0 - (new Date(e.get('createdAt')).valueOf()) -
                    (e.get('fixedState') === ENTRY_PINNED_STATE ? 1e12 : 0))
            .keySeq()
            .map(k => Number(k))
            .toArray();
    const tillId = Math.max(...feedEntries.data.items);
    const sortedFeedEntries = Object.assign(
      {},
      feedEntries,
      { data: Object.assign({}, feedEntries.data, { items: sortedEntries }) }
    );

    return {
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
    getFeedEntries,
    getFeedEntriesIfNeeded,
    resetFeedEntries,
  }
)(FeedPage);
