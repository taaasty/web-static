import React, { Component, PropTypes } from 'react';
import FeedsStatusStore from '../../stores/FeedsStore';
import * as FeedsUpdateActions from '../../actions/FeedsUpdateActions';
import connectToStores from '../../../../shared/react/components/higherOrder/connectToStores';
import Routes from '../../../../shared/routes/routes';
import UnreadLoadButtonContainer from '../common/UnreadLoadButtonContainer';

class FriendsLoadButtonContainer extends Component {
  onLoad(promise) {
    (promise && promise.then(FeedsUpdateActions.resetFriendsEntries));
  }
  render() {
    const { limit, unreadFriendsCount } = this.props;

    return (
      <UnreadLoadButtonContainer
        count={unreadFriendsCount}
        href={Routes.friends_feed_path()}
        limit={limit}
        onLoad={this.onLoad}
      />
    );
  }
}

FriendsLoadButtonContainer.propTypes = {
  limit: PropTypes.number,
  unreadFriendsCount: PropTypes.number.isRequired,
};

export default connectToStores(
  FriendsLoadButtonContainer,
  [ FeedsStatusStore ],
  () => ({
    unreadFriendsCount: FeedsStatusStore.getUnreadFriendsCount(),
  })
)
