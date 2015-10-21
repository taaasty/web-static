SettingsEmailEstablishShow = React.createClass

  propTypes:
    onEditStart: React.PropTypes.func.isRequired

  render: ->
    <div className="settings__item settings__item--full">
      <div className="settings__right">
        <button onClick={ this.props.onEditStart } className="button button--outline">
          <span className="button__text">
            { i18n.t('settings_email_establish') }
          </span>
        </button>
      </div>
      <div className="settings__left">
        <h3 className="settings__title">
          { i18n.t('settings_email') }
        </h3>
        <p className="settings__desc">
          { i18n.t('settings_email_description') }
        </p>
      </div>
    </div>

module.exports = SettingsEmailEstablishShow