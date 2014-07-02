###* @jsx React.DOM ###

KEYCODE_ESC = 27
KEYCODE_ENTER = 13
CANCEL_TIMEOUT = 300

module.experts = window.SettingsEmailInput = React.createClass
  getInitialState: ->
    isEditing:        false
    email:            @props.user.email
    hasInput:         @props.user.email?.length>0

  propTypes:
    user:         React.PropTypes.object.isRequired
    saveCallback: React.PropTypes.func.isRequired

  saveButtonTitle: ->
    if @state.hasInput
      'сохранить'
    else
      'отмена'

  save: ->
    @props.saveCallback 'email', @refs.email.state.value
    @setState isEditing: false, email: @refs.email.state.value

  clickSave: (event)->
    event.preventDefault()
    event.stopPropagation()
    @clearCancelTimer()
    if @state.hasInput
      @save()
    else
      @cancel()

    return false

  clickChange: (event)->
    @clearCancelTimer()
    event.preventDefault()
    event.stopPropagation()
    @setState isEditing: true
    return false

  cancel: ->
    @clearCancelTimer()
    @setState isEditing: false

  handleBlur: (event)->
    @setCancelTimer()

  handleFocus: ->
    @clearCancelTimer()

  handleKey: (event) ->
    @clearCancelTimer()
    if event.keyCode == KEYCODE_ESC
      event.preventDefault()
      @cancel()
    if event.keyCode == KEYCODE_ENTER
      event.preventDefault()
      @save()

  handleChange: (e)->
    value = e.target.value
    hasInput = value? && value.length>=5
    @setState hasInput: hasInput

  setCancelTimer: ->
    @cancelTimer = setTimeout @cancel, CANCEL_TIMEOUT

  clearCancelTimer: ->
    if @cancelTimer?
      clearInterval @cancelTimer
      @cancelTimer = null

  render: ->
    if @state.isEditing
      @edit()
    else
      @show()

  show: ->
    unless @props.user.is_confirmed
      confirmation = `<p className="settings__error">Емейл не подтвержден.
        <a href="#" title="Отправить">Отправить</a>
        подтверждение снова (или проверьте в папке «Спам»)</p>`

    ` <div className="settings__item settings__item--full">
            <div className="settings__right">
                <button onClick={this.clickChange} className="button button--outline">
                    <span className="button__text">Изменить</span>
                </button>
            </div>
            <div className="settings__left">
                <h3 className="settings__title">Емейл</h3>
                <p className="settings__desc">{this.state.email}</p>
                {confirmation}
            </div>
        </div>
        `

  edit: ->
    buttonClasses = React.addons.classSet
      'button':          true
      'button--yellow':  @state.hasInput
      'button--outline': !@state.hasInput

    `<div className="settings__item settings__item--full" >
        <div className="settings__right">
            <button onClick={this.clickSave} className={buttonClasses} >
                <span className="button__text">{this.saveButtonTitle()}</span>
            </button>
        </div>
        <div className="settings__left">
            <h3 className="settings__title">Емейл</h3>
            <div className="form-field form-field--default">
                <input ref='email' onChange={this.handleChange} onKeyDown={this.handleKey} onBlur={this.handleBlur} onFocus={this.handleFocus} autoFocus={true} className="form-field__input" type="email" required={true} defaultValue={this.state.email}/>
                <div className="form-field__bg"></div>
            </div>
        </div>
    </div>`


