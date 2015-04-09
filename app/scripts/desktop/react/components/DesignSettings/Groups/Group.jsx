let DesignSettingsGroup = React.createClass({
  propTypes: {
    title: React.PropTypes.string.isRequired
  },

  render() {
    return (
      <section className="design-settings__group">
        <header className="design-settings__group-header">
          {this.props.title}
        </header>
        <div className="design-settings__group-content">
          {this.props.children}
        </div>
      </section>
    );
  }
});

export default DesignSettingsGroup;