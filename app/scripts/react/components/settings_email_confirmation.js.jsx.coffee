###* @jsx React.DOM ###
#
window.SettingsEmailConfirmation = React.createClass
  mixins: [ReactShakeMixin]

  propTypes:
    isConfirmed:  React.PropTypes.bool.isRequired
    email:        React.PropTypes.string.isRequired

  getInitialState: ->
    # 0 - не отправлено
    # 1 - отправляю
    # 2 - отправлено, ждите
    process: 0

  clickConfirm: ->
    @setState process: 1

    $.ajax
      url:      Routes.api.request_confirm_url()
      dataType: 'json'
      method:   'post'
      success: (data) =>
        @setState process: 2
        TastyNotifyController.notify 'success', "Вам на почту отправлена ссылка для восстановления пароля"
      error: (data) =>
        @setState process: 1
        @shake()
        TastyNotifyController.errorResponse data

    console.log 'click confirm'

  render: ->
    if @props.isConfirmed
      `<p />`
    else
      switch @state.process
        when 0 then `<p className="settings__error">Емейл не подтвержден. <a onClick={this.clickConfirm} title="Отправить">Отправить</a> подтверждение снова (или проверьте в папке «Спам»)</p>`
        when 1 then `<p className="settings__error">Отправляем письмо..</p>`
        when 2 then `<p className="settings__error">Отправлено письмо на электронный ящик (проверьте в папке «Спам»).</p>`
        else `<p className="settings__error">Ошибка</p>`
