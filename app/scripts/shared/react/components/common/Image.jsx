let Image = React.createClass({
  propTypes: {
    image: React.PropTypes.shape({
      url: React.PropTypes.string.isRequired,
      geometry: React.PropTypes.object
    }).isRequired,
    maxWidth: React.PropTypes.number,
    maxHeight: React.PropTypes.number,
    className: React.PropTypes.string
  },

  render() {
    return (
      <img src={this.getUrl()}
           srcSet={this.getRetinaUrl()}
           className={this.props.className}
           style={this.getSize()} />
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
          height: parseInt(height, 10)
        };
      } else {
        size = {
          width: geometry.width,
          height: geometry.height
        };
      }
    } else {
      size = {
        width: this.props.maxWidth || null,
        height: this.props.maxHeight || null
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
  }
});

export default Image;