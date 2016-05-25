import React, { PropTypes } from 'react';
import Avatar from '../../../../../../../shared/react/components/common/Avatar';
import ItemEntryPreviewImage from './ItemEntryPreviewImage';
import { CONVERSATION_PIC_SIZE } from './Item';

function ItemEntryPic({ entry, size, title }) {
  const { author, preview_image } = entry;
  const userpic = {
    default_colors: author.userpic.default_colors,
    symbol: title[0],
  };

  return preview_image
    ? <ItemEntryPreviewImage image={preview_image} size={size} />
    : <Avatar size={size} userpic={userpic} />;
}

ItemEntryPic.propTypes = {
  entry: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
};

ItemEntryPic.defaultProps = {
  size: CONVERSATION_PIC_SIZE,
};

export default ItemEntryPic;
