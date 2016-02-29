import React, { Component, PropTypes } from 'react';
import FeedsStatusStore from '../../stores/FeedsStore';
import * as FeedsUpdateActions from '../../actions/FeedsUpdateActions';
import connectToStores from '../../../../shared/react/components/higherOrder/connectToStores';
import Routes from '../../../../shared/routes/routes';
import UnreadLoadButton from '../common/UnreadLoadButton';

class FriendsLoadButtonContainer extends Component {
  componentWillMount() {
    FeedsUpdateActions.resetFriendsEntries();
  }
  handleClick() {
    const { onClick, unreadFriendsCount } = this.props;
    const promise = onClick(unreadFriendsCount);

    (promise && promise.then(FeedsUpdateActions.resetFriendsEntries));
  }
  render() {
    const { isFetching, unreadFriendsCount } = this.props;

    return (
      <UnreadLoadButton
        count={unreadFriendsCount}
        href={Routes.friends_feed_path()}
        isLoading={isFetching}
        onClick={this.handleClick.bind(this)}
      />
    );
  }
}

FriendsLoadButtonContainer.propTypes = {
  isFetching: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  unreadFriendsCount: PropTypes.number.isRequired,
};

export default connectToStores(
  FriendsLoadButtonContainer,
  [ FeedsStatusStore ],
  () => ({
    unreadFriendsCount: FeedsStatusStore.getUnreadFriendsCount(),
  })
)
