import React, { PropTypes } from 'react';
import UserAvatar from '../../../../../components/UserAvatar';
import ItemEntryPreviewImage from './ItemEntryPreviewImage';
import { CONVERSATION_PIC_SIZE } from './Item';

function ItemEntryPic({ entry }) {
  const { author, preview_image } = entry;

  return preview_image
    ? <ItemEntryPreviewImage image={preview_image} />
    : <UserAvatar size={CONVERSATION_PIC_SIZE} user={author} />;
}

ItemEntryPic.propTypes = {
  entry: PropTypes.object.isRequired,
};

export default ItemEntryPic;
