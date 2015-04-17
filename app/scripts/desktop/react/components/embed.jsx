let EmbedComponent = React.createClass({
  propTypes: {
    autoplay: React.PropTypes.bool.isRequired,
    coverImageUrl: React.PropTypes.string,
    frameWidth: React.PropTypes.number.isRequired,
    frameHeight: React.PropTypes.number.isRequired,
    embedHtml: React.PropTypes.string.isRequired
  },

  render() {
    if (this.props.coverImageUrl != null && !this.props.autoplay) {
      return <EmbedComponentWithCover {...this.props} />;
    } else {
      return <EmbedComponentNoCover {...this.props} />;
    }
  }
});

let EmbedComponentNoCover = React.createClass({
  propTypes: {
    frameWidth: React.PropTypes.number.isRequired,
    frameHeight: React.PropTypes.number.isRequired,
    embedHtml: React.PropTypes.string.isRequired
  },

  componentDidMount() {
    let $container = $(this.getDOMNode()),
        $iframe = $container.find('iframe');
    $container.height($iframe.height());
  },

  render() {
    let { embedHtml, frameWidth: width, frameHeight: height } = this.props;

    return (
      <figure
          className="video video-without-cover"
          style={{width, height}}
          dangerouslySetInnerHTML={{__html: embedHtml || ''}} />
    );
  }
});

let EmbedComponentWithCover = React.createClass({
  propTypes: {
    coverImageUrl: React.PropTypes.string.isRequired,
    frameWidth: React.PropTypes.number.isRequired,
    frameHeight: React.PropTypes.number.isRequired,
    embedHtml: React.PropTypes.string.isRequired
  },

  render() {
    let { frameWidth: width, frameHeight: height } = this.props;
    let coverStyle = {backgroundImage: `url('${this.props.coverImageUrl}')`};

    return (
      <figure className="video" style={{width, height}}>
        <div className="video__cover" style={coverStyle}>
          <div className="video__overlay" onClick={this.play} />
          <div className="video__embed" ref="embedContainer" />
        </div>
      </figure>
    );
  },

  play() {
    let $embed = $(this.refs.embedContainer.getDOMNode()),
        $container = $(this.getDOMNode());

    $embed.show().append(this.props.embedHtml);
    $embed.width('100%');
    $embed.height('100%');

    $iframe = $embed.find('iframe');
    $iframe.attr({width: $embed.data('width') || $embed.width()});
    $iframe.attr({height: $embed.data('height') || $embed.height()});

    $embed.height($iframe.height());
    $container.height($iframe.height());
  }
});

export default EmbedComponent;