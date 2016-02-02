import React, { Component, PropTypes } from 'react';
import EntryBricksContainer from '../EntryBricks/EntryBricksContainer';
import EntryTlogsContainer from '../EntryTlogs/EntryTlogsContainer';
import FeedFilters from '../FeedFilters';

class BaseFeedPageBody extends Component {
  renderFilters() {
    const { children, navFilters, navViewMode, viewMode } = this.props;

    if (!(navFilters.items.length || navViewMode)) {
      return null;
    } 

    return (
      <FeedFilters
        navFilters={navFilters}
        navViewMode={navViewMode}
        viewMode={viewMode}
      >
        {children}
      </FeedFilters>
    );
  }
  render() {
    const { viewMode } = this.props;

    return (
      <div className="page-body">
        <div className="layout-outer">
          {viewMode === 'feed'
             ? <div>
                 <EntryBricksContainer {...this.props}>
                   {this.renderFilters()}
                 </EntryBricksContainer>
               </div>
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

BaseFeedPageBody.propTypes = {
  locale: PropTypes.string,
  navFilters: PropTypes.object,
  navViewMode: PropTypes.bool.isRequired,
  viewMode: PropTypes.oneOf(['feed', 'tlog']).isRequired,
};

BaseFeedPageBody.defaultProps = {
  navFilters: { active: null, items: [] },
  navViewMode: false,
  viewMode: 'tlog',
};

export default BaseFeedPageBody;
