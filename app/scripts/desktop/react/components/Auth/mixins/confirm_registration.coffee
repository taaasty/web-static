Auth = require '../../Auth';

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
        redirect_url = data.tlog_url + '?first_login';
        NoticeService.notifySuccess i18n.t 'signup_success', userSlug: data.name
        ReactApp.shellbox.close()
        if window.ga
          window.ga('send', 'event', 'Account', 'Registered', 'Email',
                    { hitCallback: (() -> window.location.href = redirect_url) })
        else
          _.defer -> window.location.href = redirect_url
      error: (data) =>
        if data.responseJSON && data.responseJSON.error_code is USER_EXISTS_MESSAGE
          @returnToEmail()
        else
          @shake()

        NoticeService.errorResponse data
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
