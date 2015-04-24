# Эта функция запускается из рельс в конце html. Ей в качестве параметра
# передается user

# Указываем также как и в Api модуле, пока все запросы на Api модуль не переведём
csrfToken = ->
  tokenNode = document.querySelector '[name="csrf-token"]'

  if tokenNode? then tokenNode.getAttribute('content') else null

window.Tasty =
  start: (options = {}) ->
    { user, locale, flashes } = options

    #FIXME: Make all requestes via Api module like in mobile version
    headers = {}
    headers['X-User-Token'] = user.api_key.access_token if user?
    headers['X-CSRF-Token'] = csrfToken() if csrfToken()

    headers['X-Requested-With']       = 'XMLHttpRequest'
    headers['X-Tasty-Client-Name']    = 'web_desktop'
    headers['X-Tasty-Client-Version'] = TastySettings.version

    TastyUtils.showFlashes flashes if flashes?

    $.ajaxSetup
      headers: headers
      cache:   true
      xhrFields:
        withCredentials: true
      error: (e) -> NoticeService.errorResponse e

    ReactApp.start {user, locale}