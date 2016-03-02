import React, { PropTypes } from 'react';
import LazyLoadImage from '../../../../shared/react/components/common/LazyLoadImage';

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

  return <LazyLoadImage image={image()} />;
}

FlowBrickAvatar.propTypes = {
  flowpic: PropTypes.object.isRequired,
};

export default FlowBrickAvatar;
