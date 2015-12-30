/*global i18n */
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import ConversationsListItem from './ConversationsListItem';
import UserAvatar from '../../../../../components/avatars/UserAvatar';
import Image from '../../../../../../../shared/react/components/common/Image';
import { CONVERSATION_PIC_SIZE } from './MessagesPopupConversationsListItem';

class ConversationsListItemEntry extends Component {
  renderPreviewImage(image) {
    const { width, height } = image.geometry;
    const imgHorizontal = width > height;
    const containerClasses = classNames({
      'messages__preview-image': true,
      'image-horizontal': imgHorizontal,
      'image-vertical': !imgHorizontal,
    });

    return (
      <div className={containerClasses}>
        <Image
          image={image}
          maxHeight={imgHorizontal ? CONVERSATION_PIC_SIZE : Infinity}
          maxWidth={imgHorizontal ? Infinity : CONVERSATION_PIC_SIZE}
        />
      </div>
    );
  }
  render() {
    const { conversation: { created_at, entry, last_message, unread_messages_count },
            hasUnread, hasUnreceived, onClick } = this.props;
    const previewImage = entry && entry.preview_image;
    const title = entry && entry.title || i18n.t('messages_public_conversation_title');
    const lastMessageAt = last_message ? last_message.created_at : created_at;

    return (
      <ConversationsListItem
          hasUnread={hasUnread}
          hasUnreceived={hasUnreceived}
          lastMessageAt={lastMessageAt}
          onClick={onClick}
          unreadCount={unread_messages_count}
      >
        <span className="messages__user-avatar">
          {previewImage
           ? this.renderPreviewImage(previewImage)
           : <UserAvatar size={CONVERSATION_PIC_SIZE} user={entry.author} />
          }
        </span>
        <div className="messages__dialog-text">
          <div className="messages__user-name">
            {title}
          </div>
          <div className="messages__last-message">
            <UserAvatar size={20} user={last_message.author} />
            <span dangerouslySetInnerHTML={{ __html: last_message.content_html }} />
          </div>
        </div>
      </ConversationsListItem>
    );
  }
}

ConversationsListItemEntry.propTypes = {
  conversation: PropTypes.object.isRequired,
  hasUnread: PropTypes.bool,
  hasUnreceived: PropTypes.bool,
  onClick: PropTypes.func,
};

export default ConversationsListItemEntry;
