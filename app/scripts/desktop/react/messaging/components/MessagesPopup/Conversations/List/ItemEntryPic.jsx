import React, { PropTypes } from 'react';
import Avatar from '../../../../../../../shared/react/components/common/Avatar';
import ItemEntryPreviewImage from './ItemEntryPreviewImage';
import { CONVERSATION_PIC_SIZE } from './Item';

function ItemEntryPic({ entry, title }) {
  const { author, preview_image } = entry;
  const userpic = {
    default_colors: author.userpic.default_colors,
    symbol: title[0],
  };

  return preview_image
    ? <ItemEntryPreviewImage image={preview_image} />
    : <Avatar size={CONVERSATION_PIC_SIZE} userpic={userpic} />;
}

ItemEntryPic.propTypes = {
  entry: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
};

export default ItemEntryPic;
