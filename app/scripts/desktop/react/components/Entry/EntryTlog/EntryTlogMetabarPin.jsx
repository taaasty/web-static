/*global i18n */
import React, { PropTypes } from 'react';
import Routes from '../../../../../shared/routes/routes';
import { ENTRY_PINNED_STATE, ENTRY_AWAITING_PAYMENT_STATE } from '../../../constants/EntryConstants';
import { PIN_ENTRY_ORDER } from '../../../constants/OrderConstants';
import DropdownAction from '../../common/DropdownAction';

function EntryTlogMetabarPin({ entry }) {
  const { id: entryId, fixed_order_id: orderId, fixed_state: status } = entry;
  const [ title, url ] = status === ENTRY_PINNED_STATE
    ? [ i18n.t('entry.meta.pinned'), Routes.live_feed_path() ]
    : status === ENTRY_AWAITING_PAYMENT_STATE
      ? [ i18n.t('entry.meta.awaiting_payment'), Routes.orders(orderId) ]
      : [ i18n.t('entry.meta.pin_entry'), Routes.newOrder(entryId, PIN_ENTRY_ORDER) ];

  return (
    <DropdownAction
      icon="icon--tick"
      title={title}
      url={url}
    />
  );
}

EntryTlogMetabarPin.propTypes = {
  entry: PropTypes.object.isRequired,
};

export default EntryTlogMetabarPin;
