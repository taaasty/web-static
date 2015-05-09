let EditorSaveButton = React.createClass({
  propTypes: {
    tlog: React.PropTypes.object,
    private: React.PropTypes.bool.isRequired,
    onClick: React.PropTypes.func.isRequired
  },

  render() {
    return (
      <button className="button button--green" onClick={this.props.onClick}>
        <span className="button__text">
          {this.getTitle()}
        </span>
      </button>
    );
  },

  getTitle() {
    if (this.props.tlog != null) {
      return i18n.t('editor_publish_to_tlog_button', {tlogName: this.props.tlog.slug});
    } else {
      return this.props.private ? i18n.t('editor_save_button') : i18n.t('editor_publish_button');
    }
  }
});

export default EditorSaveButton;