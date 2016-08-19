/*global i18n */
import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import FlowsNav from './FlowsNav';
import FlowBricks from './FlowBricks';
import { setBodyLayoutClassName } from '../../helpers/htmlHelpers';
import {
  appendFlows,
  getFlowsIfNeeded,
  navFilters,
  navFiltersUnauth,
  flowsData,
} from '../../actions/FlowsActions';
import { Map } from 'immutable';

const emptyFlow = Map();

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
    const { appendFlows, currentUser, flows, hasMore, isFetching, location } = this.props;
    const { filterIdx } = flowsData(location);
    const filters = currentUser.id ? navFilters : navFiltersUnauth;
    const title = i18n.t('hero.flows') + ' - ' + i18n.t(`nav_filters.flows.${filters[filterIdx]}`);

    return (
      <div className="page__inner">
        <Helmet title={title} />
        <div className="page__paper">
          <div className="page-body">
            <div className="layout-outer">
              <FlowBricks
                canLoad={!isFetching && !!hasMore}
                flows={flows}
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
  flows: PropTypes.array.isRequired,
  getFlowsIfNeeded: PropTypes.func.isRequired,
  hasMore: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
};

FlowsPage.defaultProps = {
  currentUser: {},
  flows: { items: [] },
  location: {},
};

export default connect(
  (state) => {
    const { data: { items, hasMore }, isFetching } = state.flows;
    const currentUser = state.currentUser.data;
    const flows = items.map((id) => state.entities.getIn([ 'flow', String(id) ], emptyFlow));

    return {
      currentUser,
      flows,
      hasMore: !!hasMore,
      isFetching: !!isFetching,
    };
  },
  { appendFlows, getFlowsIfNeeded }
)(FlowsPage);
