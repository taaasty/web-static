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

const LoadButtons = {
  [FEED_TYPE_LIVE]: { component: LiveLoadButtonContainer, href: Routes.live_feed_path() },
  [FEED_TYPE_BEST]: { component: BestLoadButtonContainer, href: Routes.best_feed_path() },
  [FEED_TYPE_FRIENDS]: { component: FriendsLoadButtonContainer, href: Routes.friends_feed_path() },
  [FEED_TYPE_ANONYMOUS]: { component: AnonymousLoadButtonContainer, href: Routes.live_anonymous_feed_path() },
  [FEED_TYPE_LIVE_FLOW]: { component: LiveFlowLoadButtonContainer, href: Routes.live_flows_feed_path() },
};

class FeedPageBody extends Component {
  renderFilters() {
    const { feedEntries: { data: { limit }, viewStyle }, feedType, location,
            navFilters, navViewMode } = this.props;

    if (!(navFilters.items.length || navViewMode)) {
      return null;
    }

    let UnreadButton = LoadButtons[feedType];

    const button = UnreadButton
      ? location.query && location.query.since_entry_id
        ? <PreviousEntriesButton href={UnreadButton.href} />
        : <UnreadButton.component limit={limit} />
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

  render() {
    const { FeedEntriesActions, currentUser, feedEntries } = this.props;

    return (
      <div className="page-body">
        <div className="layout-outer">
          {feedEntries.viewStyle === VIEW_STYLE_BRICKS
             ? <EntryBricksContainer
                 entries={feedEntries}
                 loadMoreEntries={FeedEntriesActions.appendFeedEntries}
               >
                 {this.renderFilters()}
               </EntryBricksContainer>
             : <div>
                 {this.renderFilters()}
                 <div className="content-area">
                   <div className="content-area__bg" />
                   <div className="content-area__inner">
                     <EntryTlogsContainer
                       currentUser={currentUser}
                       entries={feedEntries}
                       loadMoreEntries={FeedEntriesActions.appendFeedEntries}
                     />
                   </div>
                 </div>
               </div>
          }
        </div>
      </div>
    );
  }
}

FeedPageBody.propTypes = {
  FeedEntriesActions: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
  feedEntries: PropTypes.object,
  feedType: PropTypes.oneOf([
    FEED_TYPE_ANONYMOUS,
    FEED_TYPE_LIVE,
    FEED_TYPE_FRIENDS,
    FEED_TYPE_BEST,
    FEED_TYPE_LIVE_FLOW,
  ]).isRequired,
  location: PropTypes.object,
  navFilters: PropTypes.object,
  navViewMode: PropTypes.bool.isRequired,
};

FeedPageBody.defaultProps = {
  currentUser: { data: { author: {} } },
  feedEntries: { data: { items: [] } },
  location: {},
  navFilters: { active: null, items: [] },
  navViewMode: true,
};

export default FeedPageBody;
