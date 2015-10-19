import React, { Component, PropTypes } from 'react';
import FeedsStatusStore from '../../stores/FeedsStore';
import EntriesStore from '../../stores/EntriesStore';
import * as FeedsUpdateActions from '../../actions/FeedsUpdateActions';
import EntriesActions from '../../actions/EntriesActions';
import connectToStores from '../../../../shared/react/components/higherOrder/connectToStores';
import Routes from '../../../../shared/routes/routes';
import UnreadLoadButton from '../common/UnreadLoadButton';

class LiveLoadButtonContainer extends Component {
  loadNewEntries() {
    const { firstEntryId, unreadLiveCount } = this.props;
    const load = EntriesActions.loadNewEntries(
      firstEntryId,
      unreadLiveCount
    );

    (load && load.then(FeedsUpdateActions.resetLiveEntries));
  }
  render() {
    const { isLoading, unreadLiveCount } = this.props;

    return (
      <UnreadLoadButton
        count={unreadLiveCount}
        href={Routes.live_feed_path()}
        isLoading={isLoading}
        onClick={this.loadNewEntries.bind(this)}
      />
    );
  }
}

LiveLoadButtonContainer.propTypes = {
  firstEntryId: PropTypes.number,
  isLoading: PropTypes.bool.isRequired,
  unreadLiveCount: PropTypes.number.isRequired,
};

export default connectToStores(
  LiveLoadButtonContainer,
  [ EntriesStore, FeedsStatusStore ],
  () => ({
    firstEntryId: EntriesStore.getFirstEntryId(),
    isLoading: EntriesStore.isLoading(),
    unreadLiveCount: FeedsStatusStore.getUnreadLiveCount(),
  })
)
