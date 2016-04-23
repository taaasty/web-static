import React, { PropTypes } from 'react';
import Image from '../../../../../shared/react/components/common/Image';
import { CONVERSATION_PIC_SIZE } from './ConversationListItem';

function PreviewImage({ image }) {
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

PreviewImage.displayName = 'PreviewImage';

PreviewImage.propTypes = {
  image: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default PreviewImage;
