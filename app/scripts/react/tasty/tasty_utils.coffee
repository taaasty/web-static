window.TastyUtils=
  ###
  Генерирует хтмл аватара
  @param {string} username - имя пользователя
  @param {string} userpic - аватарка пользователя
  @return {string} Возвращает хтмл аватара
  ###
  createAvatar: (username, userpic) ->
    $.templates "avatarTmpl", "#tmpl-avatar"  if typeof $.render.avatarTmpl is "undefined"
    avatarData = @prepareAvatar(username, userpic)
    $.render.avatarTmpl
      userpic: avatarData.userpic
      username: username
      avatar:
        style: avatarData.style
        letter: avatarData.letter
  setCookie: (key, value) ->
    domain = "." + window.location.host.replace(/([a-z0-9-]+)\.([a-z0-9-]+\.[a-z0-9-]+)/i, "$2")
    docCookies.setItem "popup-firends-active", 1, Infinity, "/", domain
    return

  scrollFade: (container, element) ->
    height    = container.outerHeight() - element.outerHeight() / 2
    scrollTop = $(window).scrollTop()

    element.css
      "margin-top": scrollTop
      "opacity":    Math.max(1 - scrollTop / height, 0)

  getCookie: (key) ->
    docCookies.getItem key

  centerHorizontally: (element) ->
    $(element).each ->
      e = $(this)
      e.css "margin-left", -(e.width() / 2)
      return

    return

  onMousewheel: (e, d) ->
    e.stopPropagation()
    e.preventDefault()  if (@scrollTop is (@scrollHeight - @offsetHeight) and d < 0) or (@scrollTop is 0 and d > 0)
    return

  notifyErrorResponse: (response, timeout=3000) ->
    message = response.message if response.message?
    message ||= response.responseJSON.error if response.responseJSON?
    message ||= response.error if response.error?
    # fallback для старого API
    message ||= "Ошибка сети: #{response.statusText}"
    @notify "error", message, timeout

  # TODO Скрывать текущую нотификацию если она есть
  notify: (type, text, timeout=3000) ->
    throw new Error("Notification type \"" + type + "\" is unknown")  if [
      "error"
      "success"
    ].indexOf(type) is -1
    if typeof timeout is "undefined" or parseInt(timeout) is 0
      if type=='error'
        timeout = 3000
      else
        timeout = 10000

    notice = $("#tmpl-notice").render(
      type: type
      text: text
    )
    notice = $(notice)
    notice.appendTo $("body")
    notice.addClass "notice--" + type
    notice.css marginLeft: -(notice.width() / 2)
    notice.click -> $(@).remove()

    setTimeout (->
      notice.remove()
      return
    ), timeout
    return

  hideNotices: ->
    $('.notice').fadeOut()

  prepareAvatar: (username, url) ->
    letter = username.toUpperCase().charAt(0)
    styles = [
      "first"
      "second"
      "third"
      "fourth"
      "fifth"
    ]
    index = 90 - letter.charCodeAt(0)
    style = styles[Math.round(index / (styles.length + 1))]
    userpic: url
    style: style
    letter: letter
