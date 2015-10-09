import React, { PropTypes } from 'react';
import ImageLoader from 'react-imageloader';
import FitSpinner from './FitSpinner';

class Image {
  renderPreloader() {
    const style = this.getSize();
    const { width, height } = style;

    // 28 - 4 = 24 maximum spinner size for loader
    return (
      <div className="image-loader-spinner" style={style}>
        <FitSpinner size={Math.min(height, width, 28)} />
      </div>
    );
  }
  getSize() {
    const { image: { geometry }, maxWidth, maxHeight } = this.props;
    return Image.getSize({
      ...geometry,
      maxWidth,
      maxHeight,
    });
  }
  getUrl() {
    let size = this.getSize();
    return ThumborService.newImageUrl(this.props.image.url, size);
  }
  getRetinaUrl() {
    let size = this.getSize();
    return ThumborService.newRetinaImageUrl(this.props.image.url, size);
  }
  render() {
    const { className, image: { url }, isRawUrl } = this.props;
    const style = this.getSize();
    const imgProps = {
      className,
      style,
      srcSet: isRawUrl ? void 0 : this.getRetinaUrl(),
    };

    return (
      <ImageLoader
        imgProps={imgProps}
        preloader={this.renderPreloader.bind(this)}
        src={isRawUrl ? url : this.getUrl()}
        style={style}
      />
    );
  }
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
