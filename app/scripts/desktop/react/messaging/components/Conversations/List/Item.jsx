import React, { PropTypes } from 'react';
import ItemText from './ItemText';
import ItemEntry from './ItemEntry';
import ItemGroup from './ItemGroup';
import {
  PUBLIC_CONVERSATION,
  GROUP_CONVERSATION,
} from '../../../constants';

function Item(props) {
  const {
    conversation,
    showThread,
  } = props;
  const conversationType = conversation.get('type');
  const childProps = {
    conversation,
    hasUnread: conversation.get('unreadMessagesCount') > 0,
    hasUnreceived: conversation.get('unreceivedMessagesCount') > 0,
    onClick: showThread,
  };

  if (conversationType === PUBLIC_CONVERSATION) {
    return <ItemEntry {...childProps} />;
  } else if (conversationType === GROUP_CONVERSATION) {
    return <ItemGroup {...childProps} />;
  } else {
    return <ItemText {...childProps} />;
  }
}

Item.propTypes = {
  conversation: PropTypes.object.isRequired,
  showThread: PropTypes.func.isRequired,
};

export default Item;
