let BrowserSupport = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
    version: React.PropTypes.number.isRequired,
    updateUrl: React.PropTypes.string
  },

  render() {
    return (
      <div className="browserbar">
        <div className="browserbar__inner">
          {this.renderText()} {this.renderLink()}
        </div>
      </div>
    );
  },

  renderText() {
    return (
      i18n.t('browser_support_update_to', {
        browserName: this.props.name,
        browserVersion: this.props.version
      })
    );
  },

  renderLink() {
    let phrase = i18n.t('browser_support_last_version');

    if (this.props.updateUrl) {
      return <a href={this.props.updateUrl}>{phrase}</a>;
    } else {
      return phrase;
    }
  }
});

export default BrowserSupport;