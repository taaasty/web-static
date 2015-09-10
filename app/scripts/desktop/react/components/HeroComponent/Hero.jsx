let Hero = React.createClass({
  propTypes: {
    backgroundUrl: React.PropTypes.string.isRequired,
    title: React.PropTypes.node.isRequired,
    text: React.PropTypes.string,
    actions: React.PropTypes.oneOfType([
      React.PropTypes.element, React.PropTypes.arrayOf(React.PropTypes.element)
    ]).isRequired
  },

  render() {
    let heroStyles = {
      backgroundImage: `url(${this.props.backgroundUrl})`
    };

    return (
      <div className="hero hero--cover" style={heroStyles}>
        <div className="hero__overlay" />
        <div className="hero__box">
          <div className="hero__head">
            <div className="hero__title">
              <span>{this.props.title}</span>
            </div>
          </div>
          <div className="hero__text">
            <span>{this.props.text}</span>
          </div>
          {this.renderActions()}
        </div>
      </div>
    );
  },

  renderActions() {
    if (this.props.actions != null) {
      return (
        <div className="hero__actions hero__actions--visible">
          {this.props.actions}
        </div>
      );
    }

    return null;
  }
});

export default Hero;
