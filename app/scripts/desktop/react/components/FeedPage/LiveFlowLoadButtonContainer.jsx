import React, { Component, PropTypes } from 'react';
import FeedsStatusStore from '../../stores/FeedsStore';
import * as FeedsUpdateActions from '../../actions/FeedsUpdateActions';
import connectToStores from '../../../../shared/react/components/higherOrder/connectToStores';
import Routes from '../../../../shared/routes/routes';
import UnreadLoadButtonContainer from '../common/UnreadLoadButtonContainer';

class LiveFlowLoadButtonContainer extends Component {
  onLoad(promise) {
    (promise && promise.then(FeedsUpdateActions.resetLiveFlowEntries));
  }
  render() {
    const { limit, unreadLiveFlowCount } = this.props;

    return (
      <UnreadLoadButtonContainer
        count={unreadLiveFlowCount}
        href={Routes.live_flows_feed_path()}
        limit={limit}
        onLoad={this.onLoad}
      />
    );
  }
}

LiveFlowLoadButtonContainer.propTypes = {
  limit: PropTypes.number,
  unreadLiveFlowCount: PropTypes.number.isRequired,
};

export default connectToStores(
  LiveFlowLoadButtonContainer,
  [ FeedsStatusStore ],
  () => ({
    unreadLiveFlowCount: FeedsStatusStore.getUnreadLiveFlowCount(),
  })
)
