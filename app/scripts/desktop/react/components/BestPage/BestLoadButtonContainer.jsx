import React, { Component, PropTypes } from 'react';
import FeedsStatusStore from '../../stores/FeedsStore';
import connectToStores from '../../../../shared/react/components/higherOrder/connectToStores';
import Routes from '../../../../shared/routes/routes';
import UnreadLoadButton from '../common/UnreadLoadButton';

class BestLoadButtonContainer extends Component {
  render() {
    return (
      <UnreadLoadButton
        count={this.props.unreadBestCount}
        href={Routes.best_feed_path()}
      />
    );
  }
}

BestLoadButtonContainer.propTypes = {
  unreadBestCount: PropTypes.number.isRequired,
};

export default connectToStores(
  BestLoadButtonContainer,
  [FeedsStatusStore],
  () => ({
    unreadBestCount: FeedsStatusStore.getUnreadBestCount(),
  })
)
