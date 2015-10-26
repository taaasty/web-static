import React, { Component, PropTypes } from 'react';
import FeedsStatusStore from '../../stores/FeedsStore';
import * as FeedsUpdateActions from '../../actions/FeedsUpdateActions';
import connectToStores from '../../../../shared/react/components/higherOrder/connectToStores';
import Routes from '../../../../shared/routes/routes';
import UnreadLoadButtonContainer from '../common/UnreadLoadButtonContainer';

class BestLoadButtonContainer extends Component {
  onLoad(promise) {
    (promise && promise.then(FeedsUpdateActions.resetBestEntries));
  }
  render() {
    const { limit, unreadBestCount } = this.props;

    return (
      <UnreadLoadButtonContainer
        count={unreadBestCount}
        href={Routes.best_feed_path()}
        limit={limit}
        onLoad={this.onLoad}
      />
    );
  }
}

BestLoadButtonContainer.propTypes = {
  limit: PropTypes.number,
  unreadBestCount: PropTypes.number.isRequired,
};

export default connectToStores(
  BestLoadButtonContainer,
  [ FeedsStatusStore ],
  () => ({
    unreadBestCount: FeedsStatusStore.getUnreadBestCount(),
  })
)
