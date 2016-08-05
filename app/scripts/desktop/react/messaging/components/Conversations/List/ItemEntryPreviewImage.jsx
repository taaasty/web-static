import React, { PropTypes } from 'react';
import Image from '../../../../../../shared/react/components/common/Image';
import { CONVERSATION_PIC_SIZE } from './Item';

function ItemEntryPreviewImage({ image, isRawUrl, size }) {
  const width = image.getIn(['geomentry', 'width']);
  const height = image.getIn(['geometry', 'height']);
  const isHorizontal = width > height;

  return (
    <div className="messages__preview-image">
      <Image
        image={image.toJS()}
        isRawUrl={isRawUrl}
        maxHeight={isHorizontal ? size : Infinity}
        maxWidth={isHorizontal ? Infinity : size}
      />
    </div>
  );
}

ItemEntryPreviewImage.propTypes = {
  image: PropTypes.object.isRequired,
  isRawUrl: PropTypes.bool,
  size: PropTypes.number,
};

ItemEntryPreviewImage.defaultProps = {
  size: CONVERSATION_PIC_SIZE,
};

export default ItemEntryPreviewImage;
