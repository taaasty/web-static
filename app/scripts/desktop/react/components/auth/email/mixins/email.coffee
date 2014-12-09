EmailConfirmRegistration = require '../confirm_registration'

INVALID_PASSWORD_MESSAGE = 'user_authenticator/invalid_password'
INVALID_EMAIL_MESSAGE    = 'user_authenticator/user_by_email_not_found'
INVALID_SLUG_MESSAGE     = 'user_authenticator/user_by_slug_not_found'

#TODO: i18n
LOGIN_EMPTY_ERROR         = 'Вы забыли ввести логин'
LOGIN_MIN_LENGTH_ERROR    = 'Логин должен содержать не менее 3 символов'
PASSWORD_EMPTY_ERROR      = 'Вы забыли ввести пароль'
PASSWORD_MIN_LENGTH_ERROR = 'Пароль должен содержать не менее 3 символов'

EmailMixin =

  isValid: ->
    { login, password } = @state.formData

    switch
      when login.length == 0
        TastyNotifyController.notify 'error', LOGIN_EMPTY_ERROR
        return false
      when login.length < 3
        TastyNotifyController.notify 'error', LOGIN_MIN_LENGTH_ERROR
        return false
      when password.length == 0
        TastyNotifyController.notify 'error', PASSWORD_EMPTY_ERROR
        return false
      when password.length < 3
        TastyNotifyController.notify 'error', PASSWORD_MIN_LENGTH_ERROR
        return false
      else return true

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
            when INVALID_EMAIL_MESSAGE, INVALID_SLUG_MESSAGE
              proposedData = data.responseJSON.proposed_data

              @safeUpdateState(isLoginError: true)

              if proposedData?
                return @handleInvalidLogin(proposedSlug: proposedData.slug)

        TastyNotifyController.errorResponse data
      complete: =>
        @safeUpdateState(isProcess: false)

  handleSubmit: ->
    @resetPasswordErrors()

    if @isValid() then @login() else @shake()

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