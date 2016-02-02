import React, { Component, PropTypes } from 'react';
import EntriesStore from '../../stores/EntriesStore';
import EntriesActions from '../../actions/EntriesActions';
import connectToStores from '../../../../shared/react/components/higherOrder/connectToStores';
import UnreadLoadButton from '../common/UnreadLoadButton';

//magic number
const ENTRIES_LIMIT = 60;

class UnreadLoadButtonContainer extends Component {
  loadNewEntries() {
    const { firstEntryId, count, onLoad } = this.props;
    const load = EntriesActions.loadNewEntries(firstEntryId, count);

    (onLoad && onLoad(load));
  }
  render() {
    const { count, href, isLoading } = this.props;

    return (
      <UnreadLoadButton
        count={count}
        href={href}
        isLoading={isLoading}
        onClick={count > ENTRIES_LIMIT ? void 0 : this.loadNewEntries.bind(this)}
      />
    );
  }
}

UnreadLoadButtonContainer.propTypes = {
  count: PropTypes.number.isRequired,
  firstEntryId: PropTypes.number,
  href: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
  limit: PropTypes.number,
  onLoad: PropTypes.func,
};

UnreadLoadButtonContainer.defaultProps = {
  limit: ENTRIES_LIMIT,
};

export default connectToStores(
  UnreadLoadButtonContainer,
  [ EntriesStore ],
  () => ({
    firstEntryId: EntriesStore.getFirstEntryId(),
    isLoading: EntriesStore.isLoading(),
  })
)
