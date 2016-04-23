import React, { Component, PropTypes } from 'react';
import MessageStore from '../../../../../stores/message';
import MessengerViewActions from '../../../../../actions/view/messenger';
import MessageListItem from './item';
import SystemMessage from './SystemMessage';
import { SYSTEM_MSG } from '../../../../../constants/MessagingConstants';

const ERROR_STATE = 'error';
const SENT_STATE = 'sent';
const READ_STATE = 'read';
const SENDING_STATE = 'sending';

class MessageListItemManager extends Component {
  state = this.getStateFromProps(this.props);
  componentWillReceiveProps(nextProps) {
    this.setState(this.getStateFromProps(nextProps));
  }
  activateSendingState() {
    this.setState({ currentState: SENDING_STATE });
  }
  resendMessage() {
    const { conversation_id, content_html, uuid } = this.props.item;

    this.activateSendingState();
    MessengerViewActions.recreateMessage(conversation_id, content_html, uuid);
  }
  getStateFromProps(props) {
    const currentState = props.item.sendingError
            ? ERROR_STATE
            : props.item.id
              ? props.item.read == null ? SENT_STATE : READ_STATE
              : SENDING_STATE;

    return {
      currentState,
      itemInfo: MessageStore.getInfo(props.item, props.item.conversation_id),
    };
  }
  render() {
    const { item } = this.props;
    const { currentState, itemInfo } = this.state;

    return item.type === SYSTEM_MSG
      ? <SystemMessage message={item} />
      : <MessageListItem
          deliveryStatus={currentState}
          item={item}
          itemInfo={itemInfo}
          onResendMessage={this.resendMessage.bind(this)}
        />;
  }
}

MessageListItemManager.displayName = 'MessageListItemManager';

MessageListItemManager.propTypes = {
  item: PropTypes.object.isRequired,
};

export default MessageListItemManager;
