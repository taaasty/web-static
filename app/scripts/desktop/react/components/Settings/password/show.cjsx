SettingsPasswordShow = React.createClass

  propTypes:
    onEditStart: React.PropTypes.func.isRequired

  render: ->
    <div className="settings__item settings__item--full">
      <div className="settings__right">
        <button className="button button--outline"
                onClick={ this.handleButtonClick }>
          <span className="button__text">
            { i18n.t('settings_password_edit_button') }
          </span>
        </button>
      </div>
      <div className="settings__left">
        <h3 className="settings__title">
          { i18n.t('settings_password') }
        </h3>
        <p className="settings__desc">
          { i18n.t('settings_password_description') }
        </p>
      </div>
    </div>

  handleButtonClick: (e) ->
    e.preventDefault()
    @props.onEditStart()

module.exports = SettingsPasswordShow