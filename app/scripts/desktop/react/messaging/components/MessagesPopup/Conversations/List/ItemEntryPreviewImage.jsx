import React, { PropTypes } from 'react';
import Image from '../../../../../../../shared/react/components/common/Image';
import { CONVERSATION_PIC_SIZE } from './Item';

function ItemEntryPreviewImage({ image, isRawUrl }) {
  const { width, height } = image.geometry;
  const imgHorizontal = width > height;

  return (
    <div className="messages__preview-image">
      <Image
        image={image}
        isRawUrl={isRawUrl}
        maxHeight={imgHorizontal ? CONVERSATION_PIC_SIZE : Infinity}
        maxWidth={imgHorizontal ? Infinity : CONVERSATION_PIC_SIZE}
      />
    </div>
  );
}

ItemEntryPreviewImage.propTypes = {
  image: PropTypes.shape({
    geometry: PropTypes.object,
    url: PropTypes.string.isRequired,
  }).isRequired,
  isRawUrl: PropTypes.bool,
};

export default ItemEntryPreviewImage;
