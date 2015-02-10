NotifyController = require '../../../controllers/notify'
{ PropTypes } = React

SettingsEmailShow = React.createClass
  displayName: 'SettingsEmailShow'

  propTypes:
    email:    PropTypes.string.isRequired
    onChange: PropTypes.func.isRequired

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
                 defaultValue={ @props.email }
                 className="form-field__input" />
        </div>
        <div className="settings__email-actions">
          <button className="settings__change-button"
                  onClick={ @handleClick }>
            Изменить
          </button>
        </div>
      </div>
    </div>

  isValid: ->
    email = @refs.emailField.getDOMNode().value

    switch
      when email.length == 0
        NotifyController.notifyError 'Емейл не может быть пустым'
        false
      when email == @props.email
        NotifyController.notifyError 'Новый емейл должен отличаться от текущего'
        false
      else true

  handleClick: (e) ->
    e.preventDefault()
    email = @refs.emailField.getDOMNode().value

    @props.onChange(email) if @isValid()

module.exports = SettingsEmailShow