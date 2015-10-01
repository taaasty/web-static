import React, { Component, PropTypes } from 'react';
import FeedsStatusStore from '../../stores/FeedsStore';
import connectToStores from '../../../../shared/react/components/higherOrder/connectToStores';
import Routes from '../../../../shared/routes/routes';
import UnreadLoadButton from '../common/UnreadLoadButton';

class LiveLoadButtonContainer extends Component {
  render() {
    return (
      <UnreadLoadButton
        count={this.props.unreadLiveCount}
        href={Routes.live_feed_path()}
      />
    );
  }
}

LiveLoadButtonContainer.propTypes = {
  unreadLiveCount: PropTypes.number.isRequired,
};

export default connectToStores(
  LiveLoadButtonContainer,
  [FeedsStatusStore],
  () => ({
    unreadLiveCount: FeedsStatusStore.getUnreadLiveCount(),
  })
);
