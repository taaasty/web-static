import React, { Component, PropTypes } from 'react';
import FeedsStatusStore from '../../stores/FeedsStore';
import * as FeedsUpdateActions from '../../actions/FeedsUpdateActions';
import connectToStores from '../../../../shared/react/components/higherOrder/connectToStores';
import Routes from '../../../../shared/routes/routes';
import UnreadLoadButton from '../common/UnreadLoadButton';

class AnonymousLoadButtonContainer extends Component {
  componentWillMount() {
    FeedsUpdateActions.resetAnonymousEntries();
  }
  handleClick() {
    const { onClick, unreadAnonymousCount } = this.props;
    const promise = onClick(unreadAnonymousCount);

    (promise && promise.then(FeedsUpdateActions.resetAnonymousEntries));
  }
  render() {
    const { isFetching, unreadAnonymousCount } = this.props;

    return (
      <UnreadLoadButton
        count={unreadAnonymousCount}
        href={Routes.live_anonymous_feed_path()}
        isLoading={isFetching}
        onClick={this.handleClick.bind(this)}
      />
    );
  }
}

AnonymousLoadButtonContainer.propTypes = {
  isFetching: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  unreadAnonymousCount: PropTypes.number.isRequired,
};

export default connectToStores(
  AnonymousLoadButtonContainer,
  [ FeedsStatusStore ],
  () => ({
    unreadAnonymousCount: FeedsStatusStore.getUnreadAnonymousCount(),
  })
)
