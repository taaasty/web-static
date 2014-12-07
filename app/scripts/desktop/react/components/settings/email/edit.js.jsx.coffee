###* @jsx React.DOM ###

SettingsEmailEdit = React.createClass

  propTypes:
    email:        React.PropTypes.any.isRequired
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
    saveButtonTitle = @getSaveButtonTitle()
    buttonClasses = React.addons.classSet {
      'button':          true
      'button--yellow':  @state.hasInput
      'button--outline': !@state.hasInput
    }

    return `<div className="settings__item settings__item--full">
              <div className="settings__right">
                <button ref="saveButton"
                        className={ buttonClasses }
                        onMouseDown={ this.handleClickSave }>
                  <span className="button__text">
                    { saveButtonTitle }
                  </span>
                </button>
              </div>
              <div className="settings__left">
                <h3 className="settings__title">Емейл</h3>
                <div className="form-field form-field--default">
                  <input ref="email"
                         defaultValue={ this.props.email }
                         onChange={ this.handleChange }
                         onKeyDown={ this.handleKeyDown }
                         onFocus={ this.handleFocus }
                         onBlur={ this.handleBlur }
                         className="form-field__input" />
                  <div className="form-field__bg" />
                </div>
              </div>
            </div>`

  getSaveButtonTitle: ->
    if @state.hasInput then 'сохранить' else 'отмена'

  handleClickSave: (e) ->
    e.preventDefault()
    e.stopPropagation()

    newEmail = @$emailField.val()

    if @state.hasInput then @props.onSubmitEdit(newEmail) else @props.onCancelEdit()

  handleChange: ->
    newEmail = @$emailField.val()
    hasInput = newEmail.length >= 5

    @setState(hasInput: hasInput)

  handleKeyDown: (e) ->
    newEmail = @$emailField.val()

    switch e.key
      when 'Escape'
        e.preventDefault()
        @props.onCancelEdit()
      when 'Enter'
        e.preventDefault()
        @props.onSubmitEdit newEmail

  handleFocus: ->
    # После фокуса, переводим курсор в конец строки
    valueLength = @$emailField.val().length

    if @$emailField.get(0).setSelectionRange?
      @$emailField.get(0).setSelectionRange valueLength, valueLength
    else
      @$emailField.val @$emailField.val()

  handleBlur: (e) ->
    if e.relatedTarget is @$saveButton.get(0)
      e.preventDefault()
    else
      @props.onCancelEdit()

module.exports = SettingsEmailEdit