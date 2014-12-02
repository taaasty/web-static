USER_EXISTS_MESSAGE = 'user_creator/user_exists'

ConfirmRegisterMixin =

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
        TastyNotifyController.notify 'success', "Добро пожаловать, #{data.name}! Подождите, я перезагружусь.."
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

  handleApproveClick: (e) ->
    e.preventDefault()
    @register()

  handleDisapproveClick: (e) ->
    e.preventDefault()
    @returnToEmail()

module.exports = ConfirmRegisterMixin