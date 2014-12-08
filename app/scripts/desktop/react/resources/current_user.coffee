CurrentUserResource =

  update: ({data, beforeSend, success, error, complete}) ->
    $.ajax
      url: ApiRoutes.update_profile_url()
      method: 'PUT'
      data: data
      beforeSend: beforeSend
      success: success
      error: error
      complete: complete

  cancelEmailConfirmation: ({beforeSend, success, error, complete}) ->
    $.ajax
      url: ApiRoutes.request_confirm_url()
      method: 'DELETE'
      beforeSend: beforeSend
      success: success
      error: error
      complete: complete

  resendEmailConfirmation: ({beforeSend, success, error, complete}) ->
    $.ajax
      url: ApiRoutes.request_confirm_url()
      method: 'POST'
      beforeSend: beforeSend
      success: success
      error: error
      complete: complete

module.exports = CurrentUserResource