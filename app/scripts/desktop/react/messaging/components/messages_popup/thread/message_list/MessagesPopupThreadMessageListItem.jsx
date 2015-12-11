/*global ReactGrammarMixin */
import React, { createClass, PropTypes } from 'react';
import classnames from 'classnames';
import moment from 'moment';
import ImgFromFile from '../ImgFromFile';
import UserAvatar from '../../../../../components/avatars/UserAvatar';
import Image from '../../../../../../../shared/react/components/common/Image';

const ERROR_STATE = 'error';
const SENT_STATE = 'sent';
const READ_STATE = 'read';
//const SENDING_STATE = 'sending';

const MessagesPopupThreadMessageListItem = createClass({
  propTypes: {
    deliveryStatus: PropTypes.string.isRequired,
    message: PropTypes.object.isRequired,
    messageInfo: PropTypes.object.isRequired,
    onResendMessage: PropTypes.func.isRequired,
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

  renderAttachments() {
    const { attachments, files } = this.props.message;

    return attachments && attachments.length
      ? attachments.map((img) => (
          <div className="messages__img">
            <a href={img.url} target="_blank">
              <Image
                image={img}
                isRawUrl
                maxWidth={220}
              />
            </a>
          </div>))
      : files && files.length
        ? files.map((file) => (
            <div className="messages__img">
              <ImgFromFile file={file} />
            </div>))
        : null;
  },

  renderUserSlug() {
    const { slug, tlog_url } = this.props.messageInfo.user;

    return this.isIncoming()
      ? <span className="messages__user-name">
          <a href={tlog_url} target="_blank">
            {slug}
          </a>
        </span>
      : null;
  },

  renderUserAvatar() {
    const { user } = this.props.messageInfo;

    return this.isIncoming()
      ? <a href={user.tlog_url} target="_blank">
          <span className="messages__user-avatar">
            <UserAvatar size={35} user={user} />
          </span>
        </a>
      : null;
  },

  render() {
    const { message: { content_html } } = this.props;
    const messageClasses = classnames({
      'message': true,
      'message--from': this.isOutgoing(),
      'message--to': this.isIncoming(),
    });

    return (
      <div className={messageClasses}>
        {this.renderUserAvatar()}
        <div className="messages__bubble">
          {this.renderUserSlug()}
          <span
            className="messages__text"
            dangerouslySetInnerHTML={{__html: content_html || ''}}
          />
          <div className="messages__img-container">
            {this.renderAttachments()}
          </div>
        </div>
        <span className="messages__date">
          {this.renderMessageCreatedAt()}
          {this.renderDeliveryStatus()}
        </span>
      </div>
    );
  },
});

export default MessagesPopupThreadMessageListItem;
