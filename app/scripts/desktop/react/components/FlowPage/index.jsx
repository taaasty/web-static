import React, { Component, PropTypes } from 'react';
import HeroFlow from '../HeroComponent/HeroFlow';
import EntryBricksContainer from '../EntryBricks/EntryBricksContainer';
import EntryTlogsContainer from '../EntryTlogs/EntryTlogsContainer';

class FlowPageContainer extends Component {
  state = {
    
  }
  render() {
    return (
      <div className="page">
        <div className="page__inner">
          <div className="page__paper">
            <header className="page-header">
              <HeroFlow
                
              />
            </header>
            <div className="page-body">
              <div className="layout-outer">
                
                <EntryBricksContainer />
                
                <div className="content-area">
                  <div className="content-area__bg" />
                  <div className="content-area__inner">
                    <EntryTlogsContainer />
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

FlowPageContainer.propTypes = {
  style: PropTypes.oneOf(['feed', 'tlog']).isRequired,
};

FlowPageContainer.defaultProps = {
  style: 'tlog',
};

export default FlowPageContainer;
