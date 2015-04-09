let DesignSettingsOptionUpload = React.createClass({
  propTypes: {
    optionName: React.PropTypes.string.isRequired,
    backgroundImageUrl: React.PropTypes.string.isRequired,
    backgroundImageEnabled: React.PropTypes.bool.isRequired,
    onBgImageChange: React.PropTypes.func.isRequired,
    onImageVisibilityChange: React.PropTypes.func.isRequired
  },

  render() {
    return (
      <span>
        <span className="design-settings__text ds-absolute-left ds-fadein-down">
          {i18n.t('design_settings_upload_drag_or')}
          <span className="form-upload form-upload--cover">
            <span className="form-upload__text">
              {i18n.t('design_settings_upload_upload')}
            </span>
            <input type="file"
                   accept="image/*"
                   className="form-upload__input"
                   onChange={this.handleBgImageChange} />
          </span>
        </span>
        <span className="design-settings__cover ds-absolute-right ds-fadeout-right"
              style={{ backgroundImage: `url("${this.props.backgroundImageUrl}")` }} />
        <span className="design-settings__text ds-absolute-right ds-fadein-left">
          <span className="form-checkbox">
            <input type="checkbox"
                   defaultChecked={this.props.backgroundImageEnabled}
                   id={this.props.optionName}
                   className="form-checkbox__input"
                   onChange={this.handleVisibilityChange} />
            <label htmlFor={this.props.optionName}
                   className="form-checkbox__label">
              <span className="form-checkbox__box">
                <i className="form-checkbox__icon" />
              </span>
              {i18n.t('design_settings_background_enabled')}
            </label>
          </span>
        </span>
      </span>
    );
  },

  handleVisibilityChange(e) {
    this.props.onImageVisibilityChange(e.target.checked);
  },

  handleBgImageChange(e) {
    let file = e.target.files[0];

    if (file) {
      this.props.onBgImageChange(file);
    }
  }
});

export default DesignSettingsOptionUpload;