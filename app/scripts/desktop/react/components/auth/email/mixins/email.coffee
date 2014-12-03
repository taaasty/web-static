EmailConfirmRegistration = require '../confirm_registration'

INVALID_PASSWORD_MESSAGE = 'user_authenticator/invalid_password'
INVALID_LOGIN_MESSAGE    = 'user_authenticator/user_not_found'

#TODO: i18n
LOGIN_LENGTH_ERROR    = 'Введите свой емейл или имя на сайте'
PASSWORD_LENGTH_ERROR = 'Введите пароль'

EmailMixin =

  isFormValid: ->
    { login, password } = @state.formData

    if login.length < 3
      TastyNotifyController.errorResponse LOGIN_LENGTH_ERROR
      return false

    if password.length < 3
      TastyNotifyController.errorResponse PASSWORD_LENGTH_ERROR
      return false

    true

  login: ->
    { login, password } = @state.formData

    @setState(isProcess: true)

    @createRequest
      url: ApiRoutes.signin_url()
      method: 'POST'
      data:
        email:    login
        password: password
      success: (data) =>
        TastyNotifyController.notifySuccess "Добро пожаловать, #{ data.name }! Подождите, я перезагружусь.."
        ReactApp.shellbox.close()
        _.defer -> location.reload true
      error: (data) =>
        @shake()

        if data.responseJSON?
          switch data.responseJSON.error_code
            when INVALID_PASSWORD_MESSAGE then @safeUpdateState(isPasswordError: true)
            when INVALID_LOGIN_MESSAGE
              @safeUpdateState(isLoginError: true)

              #FIXME: В ответе data, должен быть ключ proposed_data, если сервер
              #       предлагает варианты для регистрации
              data.responseJSON.proposed_data ?= {slug: 'qwerty'} # Mock

              proposedData = data.responseJSON.proposed_data

              if proposedData?
                return @handleInvalidLogin(proposedSlug: proposedData.slug)

        TastyNotifyController.errorResponse data
      complete: =>
        @safeUpdateState(isProcess: false)

  handleSubmit: ->
    @resetPasswordErrors()

    if @isFormValid() then @login() else @shake()

  handleInvalidLogin: ({proposedSlug}) ->
    ReactApp.shellbox.show EmailConfirmRegistration, {
      email:        @state.formData.login
      password:     @state.formData.password
      proposedSlug: proposedSlug
    }

  resetPasswordErrors: ->
    @setState
      isLoginError:    false
      isPasswordError: false

  handleLoginChange: (val) ->
    newFormData       = _.clone @state.formData
    newFormData.login = val

    @setState(formData: newFormData)

  handlePasswordChange: (val) ->
    newFormData          = _.clone @state.formData
    newFormData.password = val

    @setState(formData: newFormData)

module.exports = EmailMixin