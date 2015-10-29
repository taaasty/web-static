import React, { Component, PropTypes } from 'react';
import FeedsStatusStore from '../../stores/FeedsStore';
import * as FeedsUpdateActions from '../../actions/FeedsUpdateActions';
import connectToStores from '../../../../shared/react/components/higherOrder/connectToStores';
import Routes from '../../../../shared/routes/routes';
import UnreadLoadButtonContainer from '../common/UnreadLoadButtonContainer';

class AnonymousLoadButtonContainer extends Component {
  onLoad(promise) {
    (promise && promise.then(FeedsUpdateActions.resetAnonymousEntries));
  }
  render() {
    const { limit, unreadAnonymousCount } = this.props;

    return (
      <UnreadLoadButtonContainer
        count={unreadAnonymousCount}
        href={Routes.live_anonymous_feed_path()}
        limit={limit}
        onLoad={this.onLoad}
      />
    );
  }
}

AnonymousLoadButtonContainer.propTypes = {
  limit: PropTypes.number,
  unreadAnonymousCount: PropTypes.number.isRequired,
};

export default connectToStores(
  AnonymousLoadButtonContainer,
  [ FeedsStatusStore ],
  () => ({
    unreadAnonymousCount: FeedsStatusStore.getUnreadAnonymousCount(),
  })
)
