###* @jsx React.DOM ###

KEYCODE_ESC = 27
KEYCODE_ENTER = 13
CANCEL_TIMEOUT = 500

module.experts = window.SettingsPasswordItem = React.createClass
  mixins: [ReactShakeMixin]

  getInitialState: ->
    isEditing: false
    hasInput:  false

  validate: (silent=false)->
    unless @refs.password.state.value?
      unless silent
        TastyNotifyController.notify 'error', 'Введите пароль чтобы соохранить или нажмите ESC чтобы прекратить'
        @shake()
      return false

    if @refs.password.state.value.length<3
      unless silent
        TastyNotifyController.notify 'error', 'Пароль должен быть не менее 3-х символов в длинну'
        @shake()
      return false

    if @refs.password.state.value.length !=  @refs.password_confirm.state.value.length
      unless silent
        @refs.password.setState value: ''
        @refs.password_confirm.setState value: ''
        TastyNotifyController.notify 'error', 'Пароли не совпадают'
        @shake()
      return false
    return true

  save: ->
    return unless @validate()

    @props.saveCallback 'password', @refs.password.state.value
    @setState isEditing: false

  clickSave: (event)->
    @clearCancelTimer()
    event.preventDefault()
    event.stopPropagation()
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
      return
    if event.keyCode == KEYCODE_ENTER
      event.preventDefault()
      @save()
      return

  hasInput: ->
    @refs.password.state.value? && @refs.password.state.value.length>1 && @refs.password_confirm.state.value? && @refs.password_confirm.state.value.length>1


  handleChange: ->
    # Когда срабатывает этот колбек измнения в state еще не сохранены,
    # поэтому откладываем обновление hasInput
    f = => @setState hasInput: @hasInput()
    setTimeout f, 50

  saveButtonTitle: ->
    if @state.hasInput
      'сохранить'
    else
      'отмена'

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
    `<div className="settings__item settings__item--full">
    <div className="settings__right">
        <button onClick={this.clickChange} className="button button--outline" >
            <span className="button__text">Изменить</span>
        </button>
      </div>
        <div className="settings__left">
          <h3 className="settings__title">Пароль</h3>
          <p className="settings__desc">Отправлять мне емейл уведомления и всех новых комментариях, подписчиках и личных сообщениях?</p>
        </div>
        </div>`

  edit: ->
    buttonClasses = React.addons.classSet
      'button':          true
      'button--yellow':  @state.hasInput
      'button--outline': !@state.hasInput

    `<div className="settings__item setting_item--full">
      <div className="settings__right">
      <button onClick={this.clickSave} className={buttonClasses} >
        <span className="button__text">{this.saveButtonTitle()}</span>
      </button>
    </div>
    <div className="settings__left">
      <h3 className="settings__title">Пароль</h3>
      <div className="form-field form-field--default">
        <input onKeyDown={this.handleKey} onBlur={this.handleBlur} onChange={this.handleChange} onFocus={this.handleFocus} autoFocus={true} className="form-field__input" ref="password" type="password" placeholder="Новый пароль" />
        <div className="form-field__bg"></div>
      </div>
      <div className="form-field form-field--default">
        <input onKeyDown={this.handleKey} onBlur={this.handleBlur} onChange={this.handleChange} onFocus={this.handleFocus} className="form-field__input" ref="password_confirm" type="password" placeholder="Новый пароль еще раз" />
        <div className="form-field__bg"></div>
      </div>
    </div>
    </div>`

