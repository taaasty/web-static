import React, { PropTypes } from 'react';
import Image from '../../../../../../../shared/react/components/common/Image';
import { CONVERSATION_PIC_SIZE } from './Item';

function ItemEntryPreviewImage({ image, isRawUrl, size }) {
  const { width, height } = image.geometry;
  const imgHorizontal = width > height;

  return (
    <div className="messages__preview-image">
      <Image
        image={image}
        isRawUrl={isRawUrl}
        maxHeight={imgHorizontal ? size : Infinity}
        maxWidth={imgHorizontal ? Infinity : size}
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

ItemEntryPreviewImage.defaultProps = {
  size: CONVERSATION_PIC_SIZE,
};

export default ItemEntryPreviewImage;
