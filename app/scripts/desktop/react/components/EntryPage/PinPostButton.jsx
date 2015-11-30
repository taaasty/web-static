/*global i18n */
import React, { PropTypes } from 'react';
import moment from 'moment';
import Routes from '../../../../shared/routes/routes';
import { ENTRY_PINNED_STATE, ENTRY_AWAITING_PAYMENT_STATE } from '../../constants/EntryConstants';
import { PIN_ENTRY_ORDER } from '../../constants/OrderConstants';

class PinPostButton {
  render() {
    const { entryId, orderId, status, till } = this.props;
    const tillStr = till && moment(till).format('H:mm D MMMM');
    const [ buttonText, buttonUrl ] = status === ENTRY_PINNED_STATE
      ? [ i18n.t('buttons.entry.pinned', { date: tillStr }), Routes.orders(orderId) ]
      : status === ENTRY_AWAITING_PAYMENT_STATE
        ? [ i18n.t('buttons.entry.awaiting_payment'), Routes.orders(orderId) ]
        : [ i18n.t('buttons.entry.pin_entry'), Routes.newOrder(entryId, PIN_ENTRY_ORDER) ];

    return (
      <div className="flex-container">
        <a href={buttonUrl}>
          <button className="add-post-button">
            {buttonText}
          </button>
        </a>
      </div>
    );
  }
}

PinPostButton.propTypes = {
  entryId: PropTypes.string.isRequired,
  orderId: PropTypes.string,
  status: PropTypes.string,
  till: PropTypes.string,
};

export default PinPostButton;
