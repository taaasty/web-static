import React, { PropTypes } from 'react';
import Image from '../../../../shared/react/components/common/Image';

function FlowBrickAvatar({ flowpic }) {
  function image() {
    return {
      url: flowpic.get('originalUrl'),
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
