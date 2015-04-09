let DesignSettingsSaveButton = React.createClass({
  propTypes: {
    hasPaidValues: React.PropTypes.bool.isRequired,
    hasDesignBundle: React.PropTypes.bool.isRequired,
    onClick: React.PropTypes.func
  },

  render() {
    return (
      <button className="design-settings__save-button" onClick={this.handleClick}>
        {this.getTitle()}
      </button>
    );
  },

  getTitle() {
    let title;

    if (this.props.hasDesignBundle || !this.props.hasPaidValues) {
      title = i18n.t('design_settings_save_button');
    } else {
      title = i18n.t('design_settings_save_with_payment_button');
    }

    return title
  },

  handleClick() {
    this.props.onClick();
  }
});

export default DesignSettingsSaveButton;