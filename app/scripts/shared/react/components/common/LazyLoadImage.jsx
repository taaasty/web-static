import LazyLoad from 'react-lazy-load';
import React, { PropTypes } from 'react';
import Image from './Image';

function LazyLoadImage(props) {
  const { image: { geometry }, maxWidth, maxHeight } = props;
  const style = Image.getSize({
    ...geometry,
    maxWidth,
    maxHeight,
  });

  return (
    <LazyLoad
      height={style.height}
      threshold={parseInt(window.innerHeight, 10)}
    >
      <Image {...props} />
    </LazyLoad>
  );
}

LazyLoadImage.propTypes = {
  className: PropTypes.string,
  image: PropTypes.shape({
    geometry: PropTypes.object,
    url: PropTypes.string.isRequired,
  }).isRequired,
  isRawUrl: PropTypes.bool,
  maxHeight: PropTypes.number,
  maxWidth: PropTypes.number,
};

export default LazyLoadImage;
