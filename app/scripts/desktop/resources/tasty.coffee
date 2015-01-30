# Эта функция запускается из рельс в конце html. Ей в качестве параметра
# передается user

window.Tasty =
  start: (options = {}) ->
    { user, locale, flashes } = options

    #FIXME: Make all requestes via Api module like in mobile version
    headers = {}

    if user?
      headers['X-User-Token'] = user.api_key.access_token

    headers['X-Requested-With']       = 'XMLHttpRequest'
    headers['X-Tasty-Client-Name']    = 'web_desktop'
    headers['X-Tasty-Client-Version'] = TastySettings.version

    TastyUtils.showFlashes flashes if flashes?

    $.ajaxSetup
      headers: headers
      cache:   true
      xhrFields:
        withCredentials: true
      error: (e) -> TastyNotifyController.errorResponse e

    ReactApp.start {user, locale}