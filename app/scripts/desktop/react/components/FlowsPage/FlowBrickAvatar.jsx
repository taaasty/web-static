import React, { PropTypes } from 'react';
import Image from '../../../../shared/react/components/common/Image';

function FlowBrickAvatar({ flowpic }) {
  function image() {
    return {
      url: flowpic.original_url,
      geometry: {
        width: 362,
        height: 180,
      },
    };
  }

  return <Image image={image()} />;
}

FlowBrickAvatar.propTypes = {
  flowpic: PropTypes.object.isRequired,
};

export default FlowBrickAvatar;
