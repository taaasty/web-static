let EditorTypeImageLoadingUrl = React.createClass({
  propTypes: {
    imageUrl: React.PropTypes.string.isRequired
  },

  getDefaultProps() {
    return {
      imageUrl: 'https://drscdn.500px.org/photo/103544339/m%3D1170/c1aa9785dac814298957160c6255821f'
    };
  },

  render() {
    return (
      <div className="media-box__info">
        <div className="media-box__text">
          <span>{this.props.imageUrl}</span>
          <br />
          <span>{i18n.t('editor_image_mediabox_loading')}</span>
        </div>
      </div>
    );
  }
});

export default EditorTypeImageLoadingUrl;