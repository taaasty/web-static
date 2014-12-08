###* @jsx React.DOM ###

SettingsEmailEdit = React.createClass

  propTypes:
    email:        React.PropTypes.any.isRequired
    onSubmit:     React.PropTypes.func.isRequired
    onEditCancel: React.PropTypes.func.isRequired

  componentDidMount: ->
    emailField = @refs.email.getDOMNode()
    emailField.focus()

  getInitialState: ->
    hasInput: @props.email.length >= 5

  render: ->
    buttonClasses = React.addons.classSet {
      'button':          true
      'button--yellow':  @state.hasInput
      'button--outline': !@state.hasInput
    }

    return `<div className="settings__item settings__item--full">
              <div className="settings__right">
                <button ref="saveButton"
                        className={ buttonClasses }
                        onMouseDown={ this.handleButtonMouseDown }
                        onClick={ this.handleButtonClick }>
                  <span className="button__text">
                    { this.getButtonTitle() }
                  </span>
                </button>
              </div>
              <div className="settings__left">
                <h3 className="settings__title">Емейл</h3>
                <div className="form-field form-field--default">
                  <input ref="email"
                         defaultValue={ this.props.email }
                         onChange={ this.handleInputChange }
                         onKeyDown={ this.handleInputKeyDown }
                         onFocus={ this.handleFocus }
                         onBlur={ this.props.onEditCancel }
                         className="form-field__input" />
                  <div className="form-field__bg" />
                </div>
              </div>
            </div>`

  getButtonTitle: ->
    if @state.hasInput then 'сохранить' else 'отмена'

  handleButtonMouseDown: (e) ->
    emailField = @refs.email.getDOMNode()
    newEmail   = emailField.value

    if @state.hasInput && @props.email isnt newEmail
      @props.onSubmit newEmail
    else
      @props.onEditCancel()

  handleButtonClick: (e) ->
    e.preventDefault()

  handleInputChange: (e) ->
    newEmail = e.target.value
    hasInput = newEmail.length >= 5

    @setState(hasInput: hasInput)

  handleInputKeyDown: (e) ->
    newEmail = e.target.value

    switch e.key
      when 'Enter'
        e.preventDefault()
        @props.onSubmit newEmail
      when 'Escape'
        e.preventDefault()
        @props.onEditCancel()

  handleFocus: (e) ->
    emailField = e.target

    AppHelpers.selectAllText emailField

module.exports = SettingsEmailEdit