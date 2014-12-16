SettingsEmailEstablishEdit = React.createClass

  propTypes:
    onSubmit:     React.PropTypes.func.isRequired
    onEditCancel: React.PropTypes.func.isRequired

  getInitialState: ->
    hasInput: false

  componentDidMount: ->
    emailField = @refs.email.getDOMNode()
    emailField.focus()

  render: ->
    buttonClasses = React.addons.classSet
      'button':          true
      'button--yellow':  @state.hasInput
      'button--outline': !@state.hasInput

    return <div className="settings__item settings__item--full">
             <div className="settings__right">
               <button ref="establishButton"
                       className={ buttonClasses }
                       onMouseDown={ this.handleButtonMouseDown }
                       onClick={ this.handleButtonClick }>
                 <span className="button__text">{ this.getButtonTitle() }</span>
               </button>
             </div>
             <div className="settings__left">
               <h3 className="settings__title">Емейл</h3>
               <div className="form-field form-field--default">
                 <input ref="email"
                        onChange={ this.handleInputChange }
                        onKeyDown={ this.handleInputKeyDown }
                        onBlur={ this.props.onEditCancel }
                        className="form-field__input" />
                 <div className="form-field__bg" />
               </div>
             </div>
           </div>

  getButtonTitle: ->
    if @state.hasInput then 'установить' else 'отмена'

  handleButtonClick: (e) ->
    e.preventDefault()

  handleButtonMouseDown: (e) ->
    emailField = @refs.email.getDOMNode()
    newEmail   = emailField.value

    if @state.hasInput then @props.onSubmit(newEmail) else @props.onEditCancel()

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

module.exports = SettingsEmailEstablishEdit