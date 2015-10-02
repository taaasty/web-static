import React, { Component, PropTypes } from 'react';
import FeedsStatusStore from '../../stores/FeedsStore';
import connectToStores from '../../../../shared/react/components/higherOrder/connectToStores';
import Routes from '../../../../shared/routes/routes';
import UnreadLoadButton from '../common/UnreadLoadButton';

class FriendsLoadButtonContainer extends Component {
  render() {
    return (
      <UnreadLoadButton
        count={this.props.unreadFriendsCount}
        href={Routes.friends_feed_path()}
      />
    );
  }
}

FriendsLoadButtonContainer.propTypes = {
  unreadFriendsCount: PropTypes.number.isRequired,
};

export default connectToStores(
  FriendsLoadButtonContainer,
  [FeedsStatusStore],
  () => ({
    unreadFriendsCount: FeedsStatusStore.getUnreadFriendsCount(),
  })
)
