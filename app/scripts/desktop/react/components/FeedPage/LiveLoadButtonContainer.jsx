import React, { Component, PropTypes } from 'react';
import FeedsStatusStore from '../../stores/FeedsStore';
import * as FeedsUpdateActions from '../../actions/FeedsUpdateActions';
import connectToStores from '../../../../shared/react/components/higherOrder/connectToStores';
import Routes from '../../../../shared/routes/routes';
import UnreadLoadButton from '../common/UnreadLoadButton';

class LiveLoadButtonContainer extends Component {
  componentWillMount() {
    FeedsUpdateActions.resetLiveEntries();
  }
  handleClick() {
    const { onClick, unreadLiveCount } = this.props;
    const promise = onClick(unreadLiveCount);

    (promise && promise.then(FeedsUpdateActions.resetLiveEntries));
  }
  render() {
    const { isFetching, unreadLiveCount } = this.props;

    return (
      <UnreadLoadButton
        count={unreadLiveCount}
        href={Routes.live_feed_path()}
        isLoading={isFetching}
        onClick={this.handleClick.bind(this)}
      />
    );
  }
}

LiveLoadButtonContainer.propTypes = {
  isFetching: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  unreadLiveCount: PropTypes.number.isRequired,
};

export default connectToStores(
  LiveLoadButtonContainer,
  [ FeedsStatusStore ],
  () => ({
    unreadLiveCount: FeedsStatusStore.getUnreadLiveCount(),
  })
)
