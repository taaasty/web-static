###* @jsx React.DOM ###

window.SettingsEmailConfirmation = React.createClass
  mixins: [
    ReactShakeMixin, RequesterMixin, ErrorTimerMixin
    ComponentManipulationsMixin
  ]

  propTypes:
    email:             React.PropTypes.any.isRequired
    confirmationEmail: React.PropTypes.any.isRequired
    isConfirmed:       React.PropTypes.bool.isRequired

  getInitialState: ->
    isError:   false
    isProcess: false

  componentWillUnmount: -> @clearErrorTimer()

  render: ->
    if @isConfirmation()
      if @state.isError
        message = `<p className="settings__error">Ошибка</p>`
      else if @state.isProcess
        message = `<p className="settings__error">Отправляем письмо..</p>`
      else if @state.isSent
        message = `<p className="settings__error">Отправлено письмо на электронный ящик (проверьте в папке «Спам»).</p>`
      else
        message = `<p className="settings__error">Емейл не подтвержден. <a onClick={this.clickConfirm} title="Отправить">Отправить</a> подтверждение снова (или проверьте в папке «Спам»)</p>`
    else
      null

  isConfirmation: -> !!@props.confirmationEmail && @props.confirmationEmail != @props.email

  clickConfirm: ->
    @setState isProcess: true

    @createRequest
      url: ApiRoutes.request_confirm_url()
      method: 'POST'
      dataType: 'JSON'
      success: (data) =>
        @safeUpdateState isSent: true
        TastyNotifyController.notify 'success', "Вам на почту отправлена ссылка для восстановления пароля"
      error: (data) =>
        @startErrorTimer()
        @shake()
        TastyNotifyController.errorResponse data
      complete: => @safeUpdateState isProcess: false