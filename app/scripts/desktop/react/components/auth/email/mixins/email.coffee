EmailConfirmRegister = require '../confirm_register'

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
        console.log data
        TastyNotifyController.notifySuccess "Добро пожаловать, #{ data.name }! Подождите, я перезагружусь.."
        ReactApp.shellbox.close()
        # _.defer -> location.reload true
      error: (data) =>
        @shake()

        if data.responseJSON?
          @safeUpdateState isPasswordError: true if data.responseJSON.error_code is 'user_authenticator/invalid_password'
          # @safeUpdateState isLoginError:    true if data.responseJSON.error_code is 'user_authenticator/user_not_found'
          if data.responseJSON.error_code is 'user_authenticator/user_not_found'
            @safeUpdateState(isLoginError: true)
            @handleInvalidLogin()

        TastyNotifyController.errorResponse data
      complete: =>
        @safeUpdateState isProcess: false

  handleSubmit: ->
    @resetPasswordErrors()

    if @isFormValid() then @login() else @shake()

  handleInvalidLogin: ->
    ReactApp.shellbox.show EmailConfirmRegister, {
      login:    @state.formData.login
      password: @state.formData.password
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