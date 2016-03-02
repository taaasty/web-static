import React, { Component, PropTypes } from 'react';
import LiveLoadButtonContainer from './LiveLoadButtonContainer';
import BestLoadButtonContainer from './BestLoadButtonContainer';
import FriendsLoadButtonContainer from './FriendsLoadButtonContainer';
import AnonymousLoadButtonContainer from './AnonymousLoadButtonContainer';
import LiveFlowLoadButtonContainer from './LiveFlowLoadButtonContainer';
import EntryBricksContainer from '../EntryBricks/EntryBricksContainerRedux';
import EntryTlogsContainer from '../EntryTlogs/EntryTlogsContainerRedux';
import FeedFilters from '../FeedFilters';
import PreviousEntriesButton from '../common/PreviousEntriesButton';
import Routes from '../../../../shared/routes/routes';
import {
  FEED_TYPE_ANONYMOUS,
  FEED_TYPE_LIVE,
  FEED_TYPE_FRIENDS,
  FEED_TYPE_BEST,
  FEED_TYPE_LIVE_FLOW,
} from '../../constants/FeedConstants';
import { VIEW_STYLE_BRICKS } from '../../constants/ViewStyleConstants';

const PREPEND_LOAD_LIMIT = 30;
const LoadButtons = {
  [FEED_TYPE_LIVE]: { component: LiveLoadButtonContainer, href: Routes.live_feed_path() },
  [FEED_TYPE_BEST]: { component: BestLoadButtonContainer, href: Routes.best_feed_path() },
  [FEED_TYPE_FRIENDS]: { component: FriendsLoadButtonContainer, href: Routes.friends_feed_path() },
  [FEED_TYPE_ANONYMOUS]: { component: AnonymousLoadButtonContainer, href: Routes.live_anonymous_feed_path() },
  [FEED_TYPE_LIVE_FLOW]: { component: LiveFlowLoadButtonContainer, href: Routes.live_flows_feed_path() },
};

class FeedPageBody extends Component {
  handleClickUnreadButton(count) {
    const { getFeedEntriesIfNeeded, prependFeedEntries } = this.props;

    if (count > 0) {
      return (count < PREPEND_LOAD_LIMIT)
        ? prependFeedEntries()
        : getFeedEntriesIfNeeded(this.props.location, true);
    } else {
      return null;
    }
  }
  renderFilters() {
    const { feedEntries: { isFetching, viewStyle }, feedType, location,
            navFilters, navViewMode } = this.props;

    if (!(navFilters.items.length || navViewMode)) {
      return null;
    }

    let UnreadButton = LoadButtons[feedType];

    const button = UnreadButton
      ? location.query && location.query.since_entry_id
        ? <PreviousEntriesButton href={UnreadButton.href} />
        : <UnreadButton.component
            isFetching={isFetching}
            onClick={this.handleClickUnreadButton.bind(this)}
          />
      :null;

    return (
      <FeedFilters
        location={location}
        navFilters={navFilters}
        navViewMode={navViewMode}
        viewMode={viewStyle}
      >
        {button}
      </FeedFilters>
    );
  }
  renderBricks() {
    const { appendFeedEntries, feedEntries } = this.props;
    return (
      <EntryBricksContainer
        entries={feedEntries}
        isFeed
        loadMoreEntries={appendFeedEntries}
      >
        {this.renderFilters()}
      </EntryBricksContainer>
    );
  }
  renderTlogs() {
    const { appendFeedEntries, currentUser, feedEntries } = this.props;

    return (
      <div>
        {this.renderFilters()}
        <div className="content-area">
          <div className="content-area__bg" />
          <div className="content-area__inner">
            <EntryTlogsContainer
              currentUser={currentUser}
              entries={feedEntries}
              isFeed
              loadMoreEntries={appendFeedEntries}
            />
          </div>
        </div>
      </div>
    );
  }
  renderEmpty() {
    return (
      <div>
        {this.renderFilters()}
        <div className="content-area">
          <div className="content-area__bg" />
          <div className="content-area__inner">
            <div className="posts">
              <article className="post post--text">
                <div className="post__content">
                  {i18n.t('feed.empty')}
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    );
  }
  render() {
    const { feedEntries: { data: { items }, isFetching, viewStyle } } = this.props;

    return (
      <div className="page-body">
        <div className="layout-outer">
          {!isFetching && items.length === 0
             ? this.renderEmpty()
             : viewStyle === VIEW_STYLE_BRICKS
               ? this.renderBricks()
               : this.renderTlogs()
          }
        </div>
      </div>
    );
  }
}

FeedPageBody.propTypes = {
  appendFeedEntries: PropTypes.func.isRequired,
  currentUser: PropTypes.object.isRequired,
  feedEntries: PropTypes.object,
  feedType: PropTypes.oneOf([
    FEED_TYPE_ANONYMOUS,
    FEED_TYPE_LIVE,
    FEED_TYPE_FRIENDS,
    FEED_TYPE_BEST,
    FEED_TYPE_LIVE_FLOW,
  ]).isRequired,
  getFeedEntriesIfNeeded: PropTypes.func.isRequired,
  location: PropTypes.object,
  navFilters: PropTypes.object,
  navViewMode: PropTypes.bool.isRequired,
  prependFeedEntries: PropTypes.func.isRequired,
};

FeedPageBody.defaultProps = {
  currentUser: { data: { author: {} } },
  feedEntries: { data: { items: [] } },
  location: {},
  navFilters: { active: null, items: [] },
  navViewMode: true,
};

export default FeedPageBody;
