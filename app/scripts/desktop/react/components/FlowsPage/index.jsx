import React, { Component, PropTypes } from 'react';
import FlowsNav from './FlowsNav';
import FlowBricks from './FlowBricks';
import HeroFlows from './HeroFlows';
import { flowsData } from '../../actions/FlowsActions';

class FlowsPage extends Component {
  componentWillMount() {
    const { FlowsActions, location } = this.props;

    document.body.className = 'layout--feed';
    FlowsActions.getFlowsIfNeeded(flowsData(location));
  }
  componentWillReceiveProps(nextProps) {
    this.props.FlowsActions.getFlowsIfNeeded(flowsData(nextProps.location));
  }
  render() {
    const { FlowsActions, currentUser, flows: { data: { items, has_more }, isFetching }, location } = this.props;
    const { filterIdx } = flowsData(location);

    return (
      <div className="page__inner">
        <div className="page__paper">
          <header className="page-header">
            <HeroFlows />
          </header>
          <div className="page-body">
            <div className="layout-outer">
              <FlowsNav active={filterIdx} />
              <FlowBricks
                canLoad={!isFetching && has_more}
                currentUser={currentUser.data}
                flows={items}
                loading={isFetching}
                onLoadMoreFlows={FlowsActions.appendFlows}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

FlowsPage.displayName = 'FlowsPage';

FlowsPage.propTypes = {
  FlowsActions: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
  flows: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

FlowsPage.defaultProps = {
  currentUser: { data: {} },
  flows: { items: [] },
  location: {},
};

export default FlowsPage;
