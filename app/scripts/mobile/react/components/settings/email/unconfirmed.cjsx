{ PropTypes } = React

SettingsEmailUnconfirmed = React.createClass
  displayName: 'SettingsEmailUnconfirmed'

  propTypes:
    confirmationEmail: PropTypes.string.isRequired
    onCancel:          PropTypes.func.isRequired

  render: ->
    <div className="settings__item">
      <div className="settings__left">
        <h3 className="settings__title">
          Емейл
        </h3>
        <div className="form-field form-field--default form-field--light">
          <input type="email"
                 value={ @props.confirmationEmail }
                 disabled={ true }
                 className="form-field__input" />
        </div>
        <div className="settings__email-actions">
          <button className="settings__cancel-button"
                  onClick={ @handleClick }>
            Отменить
          </button>
        </div>
      </div>
    </div>

  handleClick: (e) ->
    e.preventDefault()
    @props.onCancel()

module.exports = SettingsEmailUnconfirmed