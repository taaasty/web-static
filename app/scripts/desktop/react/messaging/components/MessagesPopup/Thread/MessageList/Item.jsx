/*global ReactGrammarMixin */
import React, { createClass, PropTypes } from 'react';
import classnames from 'classnames';
import moment from 'moment';
import MsgUserAvatar from '../../MsgUserAvatar';
import { browserHistory } from 'react-router';
import uri from 'urijs';
import { SUPPORT_ID } from '../../../../../components/SupportLauncher';
import { PRIVATE_CONVERSATION } from '../../../../constants/ConversationConstants';
import MessageContents from './MessageContents';

const ERROR_STATE = 'error';
const SENT_STATE = 'sent';
const READ_STATE = 'read';
//const SENDING_STATE = 'sending';

const Item = createClass({
  propTypes: {
    conversationType: PropTypes.string.isRequired,
    currentUserId: PropTypes.number.isRequired,
    deliveryStatus: PropTypes.string.isRequired,
    message: PropTypes.object.isRequired,
    messageInfo: PropTypes.object.isRequired,
    onResendMessage: PropTypes.func.isRequired,
    replyMessage: PropTypes.object,
    replyMessageInfo: PropTypes.object,
    selectState: PropTypes.bool.isRequired,
    selected: PropTypes.bool,
    scrollToMsg: PropTypes.func.isRequired,
    startSelect: PropTypes.func.isRequired,
    toggleSelection: PropTypes.func.isRequired,
  },
  mixins: [ ReactGrammarMixin ],

  isUnread() {
    return !this.props.message.read_at;
  },

  isOutgoing() {
    return this.props.messageInfo.type === 'outgoing';
  },
  
  isIncoming() {
    return this.props.messageInfo.type === 'incoming';
  },

  isSupport() {
    return this.props.currentUserId === SUPPORT_ID;
  },

  toggleSelection() {
    const { selectState, toggleSelection } = this.props;

    if (selectState) {
      toggleSelection();
    }
  },

  handleClickUser(ev) {
    ev.preventDefault();
    browserHistory.push({ pathname: uri(this.props.messageInfo.user.tlog_url).path() });
  },

  handleClickMessage() {
    this.props.startSelect();
  },

  renderDeliveryStatus() {
    const { deliveryStatus: status, onResendMessage } = this.props;
    const deliveryClasses = classnames({
      'icon': true,
      'icon--refresh': status === ERROR_STATE,
      'icon--tick': status === SENT_STATE,
      'icon--double-tick': status === READ_STATE,
    });
    
    return (
      <span
        className="message-delivery__status"
        onClick={status === ERROR_STATE ? onResendMessage : null}
      >
        <span className={deliveryClasses} />
      </span>
    );
  },
  
  renderMessageCreatedAt() {
    const { created_at } = this.props.message;
    return created_at && moment(created_at).format('D MMMM HH:mm');
  },

  renderUserAvatar(user) {
    return (
      <a
        href={user.tlog_url}
        onClick={this.handleClickUser}
        target="_blank"
      >
        <span className="messages__user-avatar">
          <MsgUserAvatar size={35} user={user} />
        </span>
      </a>
    );
  },

  renderAvatar() {
    const { user } = this.props.messageInfo;

    return (this.isIncoming() && this.props.conversationType !== PRIVATE_CONVERSATION)
      ? this.renderUserAvatar(user)
      : null;
  },

  render() {
    const { message, messageInfo, replyMessage, replyMessageInfo, selected, scrollToMsg } = this.props;
    const messageClasses = classnames({
      'message': true,
      'message--from': this.isOutgoing(),
      'message--to': this.isIncoming(),
    });
    const containerClasses = classnames({
      'message--container': true,
      'message--selected': selected,
    });

    return (
      <div className={containerClasses} onClick={this.toggleSelection}>
        <div className={messageClasses} onClick={this.handleClickMessage}>
          {this.renderAvatar()}
          <div className="messages__bubble" onClick={(ev) => ev.stopPropagation()}>
            {replyMessage &&
             <div className="message--reply" onClick={scrollToMsg.bind(null, replyMessage, message)}>
               <div className="message__reply-wrapper" />
               <MessageContents
                 message={replyMessage}
                 messageInfo={replyMessageInfo}
                 showSlug
                 showSupportInfo={false}
               />
             </div>
            }
            <MessageContents
              message={message}
              messageInfo={messageInfo}
              showSlug={this.isIncoming()}
              showSupportInfo={this.isSupport()}
            />
          </div>
          <span className="messages__date">
            {this.renderMessageCreatedAt()}
            {this.renderDeliveryStatus()}
          </span>
          <div className="message__selector">
            {selected && <i className="icon icon--tick" />}
          </div>
        </div>
      </div>
    );
  },
});

export default Item;
