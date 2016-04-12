/*global i18n */
import React from 'react';
import MessengerHeader from '../MessengerHeader';

function ConversationsHeader() {
  return <MessengerHeader title={i18n.t('messenger.conversations_header')} />;
}

ConversationsHeader.displayName = 'ConversationsHeader';

export default ConversationsHeader;
