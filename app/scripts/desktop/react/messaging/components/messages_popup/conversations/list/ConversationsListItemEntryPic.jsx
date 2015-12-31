import React, { PropTypes } from 'react';
import UserAvatar from '../../../../../components/avatars/UserAvatar';
import Image from '../../../../../../../shared/react/components/common/Image';
import { CONVERSATION_PIC_SIZE } from './MessagesPopupConversationsListItem';

class ConversationsListItemEntryPic {
  renderPreviewImage(image) {
    const { width, height } = image.geometry;
    const imgHorizontal = width > height;

    return (
      <div className="messages__preview-image">
        <Image
          image={image}
          maxHeight={imgHorizontal ? CONVERSATION_PIC_SIZE : Infinity}
          maxWidth={imgHorizontal ? Infinity : CONVERSATION_PIC_SIZE}
        />
      </div>
    );
  }
  render() {
    const { author, preview_image } = this.props.entry;

    return preview_image
      ? this.renderPreviewImage(preview_image)
      : <UserAvatar size={CONVERSATION_PIC_SIZE} user={author} />;
  }
}

ConversationsListItemEntryPic.propTypes = {
  entry: PropTypes.object.isRequired,
};

export default ConversationsListItemEntryPic;
