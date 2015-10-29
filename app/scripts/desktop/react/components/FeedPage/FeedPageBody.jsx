import React, { Component, PropTypes } from 'react';
import LiveLoadButtonContainer from './LiveLoadButtonContainer';
import BestLoadButtonContainer from './BestLoadButtonContainer';
import FriendsLoadButtonContainer from './FriendsLoadButtonContainer';
import AnonymousLoadButtonContainer from './AnonymousLoadButtonContainer';
import LiveFlowLoadButtonContainer from './LiveFlowLoadButtonContainer';
import EntryBricksContainer from '../EntryBricks/EntryBricksContainer';
import EntryTlogsContainer from '../EntryTlogs/EntryTlogsContainer';
import FeedFilters from '../FeedFilters';

const LoadButtons = {
  'live': LiveLoadButtonContainer,
  'best': BestLoadButtonContainer,
  'friends': FriendsLoadButtonContainer,
  'anonymous': AnonymousLoadButtonContainer,
  'live_flow_entries': LiveFlowLoadButtonContainer,
};

class FeedPageBody extends Component {
  renderFilters() {
    const { entries_info: { limit }, feedType, locale,
            navFilters, navViewMode, viewMode } = this.props;

    if (!(navFilters.items.length || navViewMode)) {
      return null;
    }

    const LoadButtonContainer = LoadButtons[feedType];

    return (
      <FeedFilters
        navFilters={navFilters}
        navViewMode={navViewMode}
        viewMode={viewMode}
      >
        {LoadButtonContainer && <LoadButtonContainer limit={limit} locale={locale} />}
      </FeedFilters>
    );
  }

  render() {
    const { viewMode } = this.props;

    return (
      <div className="page-body">
        <div className="layout-outer">
          {viewMode === 'feed'
             ? <EntryBricksContainer {...this.props}>
                 {this.renderFilters()}
               </EntryBricksContainer>
             : <div>
                 {this.renderFilters()}
                 <div className="content-area">
                   <div className="content-area__bg" />
                   <div className="content-area__inner">
                     <EntryTlogsContainer {...this.props} />
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
  entries_info: PropTypes.object,
  feedType: PropTypes.oneOf([
    'live', 'best', 'friends',
    'anonymous', 'live_flow_entries',
  ]).isRequired,
  locale: PropTypes.string,
  navFilters: PropTypes.object,
  navViewMode: PropTypes.bool.isRequired,
  viewMode: PropTypes.oneOf(['feed', 'tlog']).isRequired,
};

FeedPageBody.defaultProps = {
  entries_info: {},
  feedType: 'live',
  navFilters: { active: null, items: [] },
  navViewMode: true,
  viewMode: 'tlog',
};

export default FeedPageBody;
