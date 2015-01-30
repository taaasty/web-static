USER_EXISTS_MESSAGE = 'user_creator/user_exists'

ConfirmRegistrationMixin =

  register: ->
    return if @state.isProcess

    { email, password, proposedSlug } = @props

    @setState(isProcess: true)

    @createRequest
      url: ApiRoutes.signup_url()
      method: 'POST'
      data:
        email:    email
        password: password
        slug:     proposedSlug
      success: (data) =>
        TastyNotifyController.notifySuccess i18n.t 'signup_success', userSlug: data.name
        ReactApp.shellbox.close()
        _.defer -> window.location.href = data.tlog_url
      error: (data) =>
        if data.responseJSON && data.responseJSON.error_code is USER_EXISTS_MESSAGE
          @returnToEmail()
        else
          @shake()

        TastyNotifyController.errorResponse data
      complete: => @safeUpdateState(isProcess: false)

  returnToEmail: ->
    { email, password } = @props

    ReactApp.shellbox.show Email, {
      login:    email
      password: password
    }

  returnToAuth: ->
    ReactApp.shellbox.show Auth

module.exports = ConfirmRegistrationMixin