###* @jsx React.DOM ###

CANCEL_TIMEOUT = 500

SettingsPasswordEdit = React.createClass

  propTypes:
    onSubmit:     React.PropTypes.func.isRequired
    onEditCancel: React.PropTypes.func.isRequired

  getInitialState: ->
    hasInput: false

  componentWillUnmount: ->
    @cancelTimeout = null

  render: ->
    buttonClasses = React.addons.classSet
      'button':          true
      'button--yellow':  @state.hasInput
      'button--outline': !@state.hasInput

    return `<div className="settings__item setting_item--full">
              <div className="settings__right">
                <button className={ buttonClasses }
                        onClick={ this.handleButtonClick }>
                  <span className="button__text">
                    { this.getButtonTitle() }
                  </span>
                </button>
              </div>
              <div className="settings__left">
                <h3 className="settings__title">Пароль</h3>
                <div className="form-field form-field--default">
                  <input ref="password"
                         autoFocus={ true }
                         type="password"
                         placeholder="Новый пароль"
                         className="form-field__input"
                         onKeyDown={ this.handleInputKeyDown }
                         onBlur={ this.handleInputBlur }
                         onChange={ this.handleInputChange }
                         onFocus={ this.handleInputFocus } />
                  <div className="form-field__bg" />
                </div>
                <div className="form-field form-field--default">
                  <input ref="password_confirm"
                         type="password"
                         placeholder="Новый пароль еще раз"
                         className="form-field__input"
                         onKeyDown={ this.handleInputKeyDown }
                         onBlur={ this.handleInputBlur }
                         onChange={ this.handleInputChange }
                         onFocus={ this.handleInputFocus } />
                  <div className="form-field__bg" />
                </div>
              </div>
            </div>`

  isValid: ->
    password        = @refs.password.getDOMNode().value
    passwordConfirm = @refs.password_confirm.getDOMNode().value

    switch
      when password.length == 0, passwordConfirm.length == 0
        TastyNotifyController.notify 'error', 'Введите пароль чтобы сохранить или нажмите ESC чтобы отказаться'
        return false
      when password.length < 3, passwordConfirm.length < 3
        TastyNotifyController.notify 'error', 'Пароль должен содержать не менее 3 символов'
        return false
      when password isnt passwordConfirm
        TastyNotifyController.notify 'error', 'Пароли не совпадают'
        return false
      else return true

  hasInput: ->
    passwordLength        = @refs.password.getDOMNode().value.length
    passwordConfirmLength = @refs.password_confirm.getDOMNode().value.length

    passwordLength > 3 && passwordConfirmLength > 3

  getButtonTitle: ->
    if @state.hasInput then 'сохранить' else 'отмена'

  setCancelTimeout: ->
    @cancelTimeout = setTimeout @props.onEditCancel, CANCEL_TIMEOUT

  clearCancelTimeout: ->
    clearTimeout @cancelTimeout if @cancelTimeout

  handleButtonClick: (e) ->
    newPassword = @refs.password.getDOMNode().value

    e.preventDefault()    
    @clearCancelTimeout()

    @props.onSubmit(newPassword) if @state.hasInput && @isValid()

  handleInputBlur: ->
    @setCancelTimeout()

  handleInputFocus: ->
    @clearCancelTimeout()

  handleInputChange: (e) ->
    @setState(hasInput: @hasInput())

  handleInputKeyDown: (e) ->
    newPassword = e.target.value

    switch e.key
      when 'Enter'
        e.preventDefault()
        @props.onSubmit(newPassword) if @isValid()
      when 'Escape'
        e.preventDefault()
        @props.onEditCancel()

module.exports = SettingsPasswordEdit