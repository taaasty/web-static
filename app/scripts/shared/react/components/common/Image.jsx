import LazyLoad from 'react-lazy-load';
import React, { createClass, PropTypes } from 'react';
import ImageLoader from 'react-imageloader';
import FitSpinner from './FitSpinner';

const Image = createClass({
  propTypes: {
    className: PropTypes.string,
    image: PropTypes.shape({
      geometry: PropTypes.object,
      url: PropTypes.string.isRequired,
    }).isRequired,
    isRawUrl: PropTypes.bool,
    maxHeight: PropTypes.number,
    maxWidth: PropTypes.number,
  },

  renderPreloader() {
    const style = this.getSize();
    const { width, height } = style;

    return (
      <div className="image-loader-spinner" style={style}>
        <FitSpinner size={Math.min(height, width)} />
      </div>
    );
  },

  render() {
    const { className, image: { url }, isRawUrl } = this.props;
    const style = this.getSize();
    const imgProps = {
      className,
      style,
      srcSet: isRawUrl ? void 0 : this.getRetinaUrl(),
    };

    return (
      <LazyLoad height={style.height}>
        <ImageLoader
          imgProps={imgProps}
          preloader={this.renderPreloader.bind(this)}
          src={isRawUrl ? url : this.getUrl()}
          style={style}
        />
      </LazyLoad>
    );
  },

  getSize() {
    let { geometry } = this.props.image;
    let size;

    if (geometry && geometry.width && geometry.height) {
      if (this.props.maxWidth || this.props.maxHeight) {
        let maxWidth = this.props.maxWidth || this.props.maxHeight,
            maxHeight = this.props.maxHeight || this.props.maxWidth,
            srcWidth = geometry.width,
            srcHeight = geometry.height;

        let width, height, ratio;

        if (srcWidth > maxWidth) {
          ratio = maxWidth / srcWidth;
          width = maxWidth;
          height = srcHeight * ratio;
          srcHeight = srcHeight * ratio;
          srcWidth = srcWidth * ratio;
        } else if (srcHeight > maxHeight) {
          ratio = maxHeight / srcHeight;
          height = maxHeight;
          width = srcWidth * ratio;
          srcWidth = srcWidth * ratio;
          srcHeight = srcHeight * ratio;
        } else {
          width = srcWidth;
          height = srcHeight;
        }

        size = {
          width: parseInt(width, 10),
          height: parseInt(height, 10),
        };
      } else {
        size = {
          width: geometry.width,
          height: geometry.height,
        };
      }
    } else {
      size = {
        width: this.props.maxWidth || null,
        height: this.props.maxHeight || null,
      };
    }

    return size;
  },

  getUrl() {
    let size = this.getSize();
    return ThumborService.newImageUrl(this.props.image.url, size);
  },

  getRetinaUrl() {
    let size = this.getSize();
    return ThumborService.newRetinaImageUrl(this.props.image.url, size);
  },
});

export default Image;
