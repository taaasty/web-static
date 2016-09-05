import React, { PropTypes } from 'react';
import classNames from 'classnames';
import moment from 'moment';
import MsgUserAvatar from '../../MsgUserAvatar';
import MessageContents from './MessageContents';
import { Link } from 'react-router';
import uri from 'urijs';
import {
  SUPPORT_ID,
} from '../../../../components/SupportLauncher';
import {
  PRIVATE_CONVERSATION,
} from '../../../constants';

const MSG_ERROR_STATE = Symbol('Error delivering message');
const MSG_SENT_STATE = Symbol('Message successfully sent');
const MSG_READ_STATE = Symbol('Message is read');

function Item(props) {
  const {
    conversationType,
    conversationUserId,
    isSelected,
    message,
    messageAuthor,
    messageState,
    onResendMessage,
    replyMessage,
    replyMessageAuthor,
    startSelect,
    toggleSelection,
  } = props;
  const isSupport = conversationUserId === SUPPORT_ID;
  const createdAt = message.get('createdAt');
  const createdAtMsg = createdAt ? moment(createdAt).format('D MMMM HH:mm') : '';

  const isIncoming = conversationUserId !== message.get('userId');

  function getStatus() {
    //const isFetching = messageState.get('isFetching', false);
    const isError = !!messageState.get('error', null);
    const isSent = !!message.get('id', false);
    const isRead = !!message.get('readAt');

    if (isRead) {
      return MSG_READ_STATE;
    } else if (isSent) {
      return MSG_SENT_STATE;
    } else if (isError) {
      return MSG_ERROR_STATE;
    }
  }

  const status = getStatus();

  const deliveryClasses = classNames({
    'icon': true,
    'icon--refresh': status === MSG_ERROR_STATE,
    'icon--tick': status === MSG_SENT_STATE,
    'icon--double-tick': status === MSG_READ_STATE,
  });
  const messageClasses = classNames({
    'message': true,
    'message--from': !isIncoming,
    'message--to': isIncoming,
  });
  const containerClasses = classNames({
    'message--container': true,
    'message--selected': isSelected,
  });

  return (
    <div className={containerClasses} onClick={toggleSelection}>
      <div className={messageClasses} onClick={startSelect}>
        {(isIncoming && conversationType !== PRIVATE_CONVERSATION) && (
          <Link to={uri(messageAuthor.get('tlogUrl', '')).path()}>
            <span className="messages__user-avatar">
              <MsgUserAvatar size={35} user={messageAuthor} />
            </span>
          </Link>
        )}
        <div className="messages__bubble" onClick={(ev) => ev.stopPropagation()}>
          {!replyMessage.isEmpty() &&
            <div className="message--reply">
              <MessageContents
                message={replyMessage}
                messageAuthor={replyMessageAuthor}
                showSlug
                showSupportInfo={false}
              />
            </div>
          }
          <MessageContents
            message={message}
            messageAuthor={messageAuthor}
            showSlug={isIncoming}
            showSupportInfo={isSupport}
          />
        </div>
        <span className="messages__date">
          {createdAtMsg}
          <span
            className="message-delivery__status"
            onClick={status === MSG_ERROR_STATE ? onResendMessage : null}
          >
            <span className={deliveryClasses} />
          </span>
        </span>
        <div className="message__selector">
          {isSelected && <i className="icon icon--tick" />}
        </div>
      </div>
    </div>
  );
}

Item.propTypes = {
  conversationType: PropTypes.string.isRequired,
  conversationUserId: PropTypes.number.isRequired,
  isSelected: PropTypes.bool.isRequired,
  message: PropTypes.object.isRequired,
  messageAuthor: PropTypes.object.isRequired,
  messageState: PropTypes.object.isRequired,
  onResendMessage: PropTypes.func.isRequired,
  replyMessage: PropTypes.object.isRequired,
  replyMessageAuthor: PropTypes.object.isRequired,
  startSelect: PropTypes.func.isRequired,
  toggleSelection: PropTypes.func.isRequired,
};

export default Item;
