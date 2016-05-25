/*global i18n */
import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import FlowsNav from './FlowsNav';
import FlowBricks from './FlowBricks';
import { setBodyLayoutClassName } from '../../helpers/htmlHelpers';
import {
  appendFlows,
  flowsData,
  getFlowsIfNeeded,
  navFilters,
  navFiltersUnauth,
} from '../../actions/FlowsActions';

class FlowsPage extends Component {
  componentWillMount() {
    const { getFlowsIfNeeded, location } = this.props;

    setBodyLayoutClassName('layout--feed');
    getFlowsIfNeeded(flowsData(location));
  }
  componentWillReceiveProps(nextProps) {
    this.props.getFlowsIfNeeded(flowsData(nextProps.location));
  }
  render() {
    const { appendFlows, currentUser, flows: { data: { items, has_more }, isFetching }, location } = this.props;
    const { filterIdx } = flowsData(location);
    const filters = !!currentUser.id ? navFilters : navFiltersUnauth;
    const title = i18n.t('hero.flows') + ' - ' + i18n.t(`nav_filters.flows.${filters[filterIdx]}`);

    return (
      <div className="page__inner">
        <Helmet title={title} />
        <div className="page__paper">
          <div className="page-body">
            <div className="layout-outer">
              <FlowBricks
                canLoad={!isFetching && !!has_more}
                currentUser={currentUser}
                flows={items}
                loading={isFetching}
                onLoadMoreFlows={appendFlows}
              >
                <FlowsNav active={filterIdx} filters={filters} />
              </FlowBricks>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

FlowsPage.displayName = 'FlowsPage';

FlowsPage.propTypes = {
  appendFlows: PropTypes.func.isRequired,
  currentUser: PropTypes.object.isRequired,
  flows: PropTypes.object.isRequired,
  getFlowsIfNeeded: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
};

FlowsPage.defaultProps = {
  currentUser: {},
  flows: { items: [] },
  location: {},
};

export default connect(
  (state) => ({
    currentUser: state.currentUser.data,
    flows: state.flows,
  }),
  { appendFlows, getFlowsIfNeeded }
)(FlowsPage);
