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
    return (
      <UnreadLoadButtonContainer
        count={this.props.unreadBestCount}
        href={Routes.best_feed_path()}
        onLoad={this.onLoad}
      />
    );
  }
}

BestLoadButtonContainer.propTypes = {
  unreadBestCount: PropTypes.number.isRequired,
};

export default connectToStores(
  BestLoadButtonContainer,
  [ FeedsStatusStore ],
  () => ({
    unreadBestCount: FeedsStatusStore.getUnreadBestCount(),
  })
)
