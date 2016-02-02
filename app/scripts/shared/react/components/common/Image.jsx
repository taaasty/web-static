import React, { PropTypes } from 'react';
import ImageLoader from 'react-imageloader';
import FitSpinner from './FitSpinner';

const Image = (props) => {
  function renderPreloader() {
    const style = getSize();
    const { width, height } = style;

    // 28 - 4 = 24 maximum spinner size for loader
    return (
      <div className="image-loader-spinner" style={style}>
        <FitSpinner size={Math.min(height, width, 28)} />
      </div>
    );
  }

  function getSize() {
    const { image: { geometry }, maxWidth, maxHeight } = props;
    return Image.getSize({
      ...geometry,
      maxWidth,
      maxHeight,
    });
  }

  function getUrl() {
    return ThumborService.newImageUrl(props.image.url, getSize());
  }

  function getRetinaUrl() {
    return ThumborService.newRetinaImageUrl(props.image.url, getSize());
  }

  const { className, image: { url }, isRawUrl } = props;
  const style = getSize();
  const imgProps = {
    className,
    style,
    srcSet: isRawUrl ? void 0 : getRetinaUrl(),
  };

  return (
    <ImageLoader
      imgProps={imgProps}
      preloader={renderPreloader}
      src={isRawUrl ? url : getUrl()}
      style={style}
    />
  );
}

Image.propTypes = {
  className: PropTypes.string,
  image: PropTypes.shape({
    geometry: PropTypes.object,
    url: PropTypes.string.isRequired,
  }).isRequired,
  isRawUrl: PropTypes.bool,
  maxHeight: PropTypes.number,
  maxWidth: PropTypes.number,
};

Image.getSize = function getSize({ width, height, maxWidth, maxHeight }) {
  if (width && height) {
    if (maxWidth || maxHeight) {
      const tMaxWidth = maxWidth || maxHeight;
      const tMaxHeight = maxHeight || maxWidth;

      let calcWidth, calcHeight, ratio;

      if (width > tMaxWidth) {
        ratio = tMaxWidth / width;
        calcWidth = tMaxWidth;
        calcHeight = height * ratio;
      } else if (height > tMaxHeight) {
        ratio = tMaxHeight / height;
        calcHeight = tMaxHeight;
        calcWidth = width * ratio;
      } else {
        calcWidth = width;
        calcHeight = height;
      }

      return ({
        width: parseInt(calcWidth, 10),
        height: parseInt(calcHeight, 10),
      });
    } else {
      return ({
        width,
        height,
      });
    }
  } else {
    return ({
      width: maxWidth || null,
      height: maxHeight || null,
    });
  }
};

export default Image;
