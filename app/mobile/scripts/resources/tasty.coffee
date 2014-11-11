window.Tasty =
  start: ({ user, flashes }) ->
    # if user?
      # headers['X-User-Token']     = user.api_key.access_token
      # headers['X-Requested-With'] = 'XMLHttpRequest'
      # CurrentUserDispatcher.setupUser user

    # $.ajaxSetup
    #   headers: headers
    #   cache:   true
    #   xhrFields:
    #     withCredentials: true
    #   error: (e) -> TastyNotifyController.errorResponse e

    ReactApp.start { user }