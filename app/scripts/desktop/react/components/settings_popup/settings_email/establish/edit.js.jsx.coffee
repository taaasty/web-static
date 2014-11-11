###* @jsx React.DOM ###

ENTER_KEYCODE = 13
ESC_KEYCODE   = 27

window.SettingsEmailEstablishEdit = React.createClass

  propTypes:
    onSubmitEstablish: React.PropTypes.func.isRequired
    onCancelEstablish: React.PropTypes.func.isRequired

  getInitialState: ->
    hasInput: false

  componentDidMount: ->
    @$establishButton = $( @refs.establishButton.getDOMNode() )
    @$emailField      = $( @refs.email.getDOMNode() )

    @$emailField.focus()

  render: ->
    buttonClasses = React.addons.classSet {
      'button':          true
      'button--yellow':  @state.hasInput
      'button--outline': !@state.hasInput
    }

    return `<div className="settings__item settings__item--full">
              <div className="settings__right">
                <button ref="establishButton"
                        className={ buttonClasses }
                        onClick={ this.onClickEstablish }>
                  <span className="button__text">{ this.getEstablishButtonTitle() }</span>
                </button>
              </div>
              <div className="settings__left">
                <h3 className="settings__title">Емейл</h3>
                <div className="form-field form-field--default">
                  <input ref="email"
                         onChange={ this.onChange }
                         onKeyDown={ this.onKeyDown }
                         onFocus={ this.onFocus }
                         onBlur={ this.onBlur }
                         className="form-field__input" />
                  <div className="form-field__bg" />
                </div>
              </div>
            </div>`

  getEstablishButtonTitle: -> if @state.hasInput then 'установить' else 'отмена'

  onClickEstablish: (e) ->
    e.preventDefault()

    email = @$emailField.val()

    if @state.hasInput then @props.onSubmitEstablish(email) else @props.onCancelEstablish()

  onChange: ->
    newEmail = @$emailField.val()
    hasInput = newEmail.length >= 5

    @setState hasInput: hasInput

  onKeyDown: (e) ->
    newEmail = @$emailField.val()

    switch e.which
      when ESC_KEYCODE
        e.preventDefault()
        @props.onCancelEstablish()
      when ENTER_KEYCODE
        e.preventDefault()
        @props.onSubmitEstablish newEmail

  onFocus: ->
    # После фокуса, переводим курсор в конец строки
    valueLength = @$emailField.val().length

    if @$emailField.get(0).setSelectionRange?
      @$emailField.get(0).setSelectionRange valueLength, valueLength
    else
      @$emailField.val @$emailField.val()

  onBlur: (e) ->
    if e.relatedTarget is @$establishButton.get 0
      e.preventDefault()
    else
      @props.onCancelEstablish()