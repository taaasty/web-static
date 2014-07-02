###* @jsx React.DOM ###

module.experts = window.RecoveryShellBox = React.createClass
  mixins: [ReactShakeMixin]

  getInitialState: ->
    inProcess: false

  gotoSelectSignin: ->
    event.preventDefault()
    event.stopPropagation()
    ReactApp.showShellBox SelectSigninShellBox

  submit: (event)->
    event.preventDefault()
    return if @state.inProcess

    slug = @refs.slug.getDOMNode().value

    if slug.length<1
      @shake()
      TastyUtils.notify 'error', 'Введите Электронную Почту или адрес дневника'
      return

    @setState inProcess: true

    $.ajax
      url:      Routes.api.recovery_url()
      dataType: 'json'
      method:   'post'
      data:
        slug_or_email: slug
      success: (data) =>
        @setState inProcess: false
        TastyUtils.notify 'success', "Вам на почту отправлена ссылка для восстановления пароля"
        ReactApp.closeShellBox()
      error: (data) =>
        @setState inProcess: false
        @shake()
        @refs.slug.getDOMNode().focus()
        TastyUtils.notifyErrorResponse data

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
              <button disabled={this.state.inProcess} className='button button--large button--green-light button--block button--rectangle'><span className='button__text'>{button_title}</span></button> 
            </div>
          </form>
          </div>
          {footer}
      </div>`

  renderFooter: ->
        `<div className='form-popup__footer'>
          <a className='form-popup__footer-item' title='Я все вспомнил, верните меня' onClick={this.gotoSelectSignin}>Я все вспомнил, верните меня</a>
        </div>`

