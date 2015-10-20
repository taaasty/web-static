import React, { Component, PropTypes } from 'react';
import FeedsStatusStore from '../../stores/FeedsStore';
import * as FeedsUpdateActions from '../../actions/FeedsUpdateActions';
import connectToStores from '../../../../shared/react/components/higherOrder/connectToStores';
import Routes from '../../../../shared/routes/routes';
import UnreadLoadButtonContainer from '../common/UnreadLoadButtonContainer';

class LiveLoadButtonContainer extends Component {
  onLoad(promise) {
    (promise && promise.then(FeedsUpdateActions.resetLiveEntries));
  }
  render() {
    return (
      <UnreadLoadButtonContainer
        count={this.props.unreadLiveCount}
        href={Routes.live_feed_path()}
        onLoad={this.onLoad}
      />
    );
  }
}

LiveLoadButtonContainer.propTypes = {
  unreadLiveCount: PropTypes.number.isRequired,
};

export default connectToStores(
  LiveLoadButtonContainer,
  [ FeedsStatusStore ],
  () => ({
    unreadLiveCount: FeedsStatusStore.getUnreadLiveCount(),
  })
)
