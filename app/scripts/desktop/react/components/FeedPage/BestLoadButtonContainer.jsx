import React, { Component, PropTypes } from 'react';
import FeedsStatusStore from '../../stores/FeedsStore';
import * as FeedsUpdateActions from '../../actions/FeedsUpdateActions';
import connectToStores from '../../../../shared/react/components/higherOrder/connectToStores';
import Routes from '../../../../shared/routes/routes';
import UnreadLoadButton from '../common/UnreadLoadButton';

class BestLoadButtonContainer extends Component {
  handleClick() {
    const { onClick, unreadBestCount } = this.props;
    const promise = onClick(unreadBestCount);

    (promise && promise.then(FeedsUpdateActions.resetBestEntries));
  }
  render() {
    const { isFetching, unreadBestCount } = this.props;

    return (
      <UnreadLoadButton
        count={unreadBestCount}
        href={Routes.best_feed_path()}
        isLoading={isFetching}
        onClick={this.handleClick.bind(this)}
      />
    );
  }
}

BestLoadButtonContainer.propTypes = {
  isFetching: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  unreadBestCount: PropTypes.number.isRequired,
};

export default connectToStores(
  BestLoadButtonContainer,
  [ FeedsStatusStore ],
  () => ({
    unreadBestCount: FeedsStatusStore.getUnreadBestCount(),
  })
)
