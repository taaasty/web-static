import React, { Component, PropTypes } from 'react';
import FeedsStatusStore from '../../stores/FeedsStore';
import * as FeedsUpdateActions from '../../actions/FeedsUpdateActions';
import connectToStores from '../../../../shared/react/components/higherOrder/connectToStores';
import Routes from '../../../../shared/routes/routes';
import UnreadLoadButton from '../common/UnreadLoadButton';

class LiveFlowLoadButtonContainer extends Component {
  componentWillMount() {
    FeedsUpdateActions.resetLiveFlowEntries();
  }
  handleClick() {
    const { onClick, unreadLiveFlowCount } = this.props;
    const promise = onClick(unreadLiveFlowCount);

    (promise && promise.then(FeedsUpdateActions.resetLiveFlowEntries));
  }
  render() {
    const { isFetching, unreadLiveFlowCount } = this.props;

    return (
      <UnreadLoadButton
        count={unreadLiveFlowCount}
        href={Routes.live_flows_feed_path()}
        isLoading={isFetching}
        onClick={this.handleClick.bind(this)}
      />
    );
  }
}

LiveFlowLoadButtonContainer.propTypes = {
  isFetching: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  unreadLiveFlowCount: PropTypes.number.isRequired,
};

export default connectToStores(
  LiveFlowLoadButtonContainer,
  [ FeedsStatusStore ],
  () => ({
    unreadLiveFlowCount: FeedsStatusStore.getUnreadLiveFlowCount(),
  })
)
