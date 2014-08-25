###* @jsx React.DOM ###

ENTER_KEYCODE = 13
ESC_KEYCODE   = 27

window.SettingsEmailEdit = React.createClass

  propTypes:
    email:        React.PropTypes.string.isRequired
    onCancelEdit: React.PropTypes.func.isRequired
    onSubmitEdit: React.PropTypes.func.isRequired
    onBlurEdit:   React.PropTypes.func.isRequired

  componentDidMount: ->
    @$saveButton = $( @refs.saveButton.getDOMNode() )
    @$emailField = $( @refs.email.getDOMNode() )

    @$emailField.focus()

  getInitialState: ->
    hasInput: @props.email?.length >= 5

  render: ->
    buttonClasses = React.addons.classSet
      'button':          true
      'button--yellow':  @state.hasInput
      'button--outline': !@state.hasInput

    return `<div className="settings__item settings__item--full" >
              <div className="settings__right">
                <button ref="saveButton"
                        className={ buttonClasses }
                        onClick={ this.onClickSave }>
                  <span className="button__text">{ this.getSaveButtonTitle() }</span>
                </button>
              </div>
              <div className="settings__left">
                <h3 className="settings__title">Емейл</h3>
                <div className="form-field form-field--default">
                  <input ref="email"
                         defaultValue={ this.props.email }
                         onChange={ this.onChange }
                         onKeyDown={ this.onKeyDown }
                         onFocus={ this.onFocus }
                         onBlur={ this.onBlur }
                         className="form-field__input" />
                  <div className="form-field__bg" />
                </div>
              </div>
            </div>`

  getSaveButtonTitle: -> if @state.hasInput then 'сохранить' else 'отмена'

  onClickSave: (e) ->
    e.preventDefault()

    newEmail = @$emailField.val()

    if @state.hasInput then @props.onSubmitEdit(newEmail) else @props.onCancelEdit()

  onChange: ->
    newEmail = @$emailField.val()
    hasInput = newEmail.length >= 5

    @setState hasInput: hasInput

  onKeyDown: (e) ->
    newEmail = @$emailField.val()

    switch e.which
      when ESC_KEYCODE
        e.preventDefault()
        @props.onCancelEdit()
      when ENTER_KEYCODE
        e.preventDefault()
        @props.onSubmitEdit newEmail

  onFocus: ->
    # После фокуса, переводим курсор в конец строки
    valueLength = @$emailField.val().length

    if @$emailField.get(0).setSelectionRange?
      @$emailField.get(0).setSelectionRange valueLength, valueLength
    else
      @$emailField.val @$emailField.val()

  onBlur: (e) ->
    if e.relatedTarget is @$saveButton.get 0
      e.preventDefault()
    else
      @props.onCancelEdit()