###* @jsx React.DOM ###

window.RecoveryShellbox = React.createClass
  mixins: [ReactShakeMixin, RequesterMixin, ComponentManipulationsMixin]

  getInitialState: ->
    inProcess: false

  gotoSelectSignin: ->
    event.preventDefault()
    event.stopPropagation()
    ReactApp.shellbox.show Auth

  submit: (event)->
    event.preventDefault()

    return if @state.inProcess

    slug = @refs.slug.getDOMNode().value

    if slug.length < 1
      @shake()
      TastyNotifyController.notify 'error', 'Введите Электронную Почту или адрес дневника'
      return

    @setState inProcess: true

    @createRequest
      url:      ApiRoutes.recovery_url()
      data:
        location:      window.location.href
        slug_or_email: slug
      method:   'POST'
      dataType: 'JSON'
      success: (data) =>
        TastyNotifyController.notify 'success', "Вам на почту отправлена ссылка для восстановления пароля", 10000
        ReactApp.shellbox.close()
      error: (data) =>
        @shake()
        @refs.slug.getDOMNode().focus()
        TastyNotifyController.errorResponse data
      complete: => @safeUpdateState inProcess: false

  render: ->
    if @state.inProcess
      button_title = 'Отправляю запрос..'
    else
      footer = @renderFooter()
      button_title = 'Вспомнить все'

    return `<div className='form-popup shellbox-content'>
              <div className='form-popup__header'><h3 className='form-popup__title'>Восстановление пароля</h3></div>
              <div className='form-popup__body'>
                <form onSubmit={this.submit}>
                  <div className='form-popup__item'>
                    <div className='form-field form-field--simple'>
                      <input ref='slug' autoFocus={true} disabled={this.state.inProcess} className='form-field__input' placeholder='Адрес дневника или электронная почта' type='text' /><
                      div className='form-field__bg' /></div> 
                  </div> 
                  <div className='form-popup__submit'>
                    <button disabled={ this.state.inProcess }
                            className="button button--large button--green-light button--block button--rectangle">
                      <span className='button__text'>
                        { button_title }
                      </span>
                    </button> 
                  </div>
                </form>
                </div>
              { footer }
            </div>`

  renderFooter: ->
   `<div className='form-popup__footer'>
      <a className='form-popup__footer-item' title='Я все вспомнил, верните меня' onClick={this.gotoSelectSignin}>Я все вспомнил, верните меня</a>
    </div>`