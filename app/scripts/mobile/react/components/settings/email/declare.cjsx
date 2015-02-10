NotifyController = require '../../../controllers/notify'
{ PropTypes } = React

SettingsEmailDeclare = React.createClass
  displayName: 'SettingsEmailDeclare'

  propTypes:
    onDeclare: PropTypes.func.isRequired

  render: ->
    <div className="settings__item">
      <div className="settings__left">
        <h3 className="settings__title">
          Емейл
        </h3>
        <div className="form-field form-field--default form-field--light">
          <input ref="emailField"
                 type="email"
                 placeholder="Ваш емейл"
                 defaultValue=""
                 className="form-field__input" />
        </div>
        <div className="settings__email-actions">
          <button className="settings__declare-button"
                  onClick={ @handleClick }>
            Установить
          </button>
        </div>
      </div>
    </div>

  isValid: ->
    email = @refs.emailField.getDOMNode().value

    if email.length == 0
      NotifyController.notifyError 'Емейл не может быть пустым'
      false
    else true

  handleClick: (e) ->
    e.preventDefault()
    email = @refs.emailField.getDOMNode().value

    @props.onDeclare(email) if @isValid()

module.exports = SettingsEmailDeclare