require './settings'
require './bundle'

Tasty.start {}

document.addEventListener "DOMContentLoaded", (->
  document.addEventListener "touchstart", (->), true

  html = document.querySelector("html")

  # Тулбар Юзера
  # userToolbarActivator = document.querySelector(".toolbar--user .toolbar__toggle")
  # userToolbarPopup = document.querySelector(".toolbar--user .toolbar__popup")
  # timeoutUserToolbar = null

  # if userToolbarActivator?
  #   userToolbarActivator.addEventListener "click", (->
  #     clearTimeout timeoutUserToolbar

  #     # Это нужно делать по transitionEnd
  #     if html.classList.contains("user-toolbar-open")
  #       timeoutUserToolbar = setTimeout (->
  #         userToolbarPopup.classList.remove "__visible"
  #       ), 500
  #     else
  #       userToolbarPopup.classList.add "__visible"

  #     html.classList.remove "feed-toolbar-open" if html.classList.contains("feed-toolbar-open")
  #     html.classList.toggle "user-toolbar-open"
  #   ), false

  # Тулбар фидов
  # feedToolbarActivator = document.querySelector(".toolbar--feed .toolbar__toggle")
  # feedToolbarPopup = document.querySelector(".toolbar--feed .toolbar__popup")
  # timeoutFeedToolbar = null

  # if feedToolbarActivator?
  #   feedToolbarActivator.addEventListener "click", (->
  #     clearTimeout timeoutFeedToolbar

  #     # Это нужно делать по transitionEnd
  #     if html.classList.contains("feed-toolbar-open")
  #       timeoutFeedToolbar = setTimeout (->
  #         feedToolbarPopup.classList.remove "__visible"
  #       ), 500
  #     else
  #       feedToolbarPopup.classList.add "__visible"

  #     html.classList.remove "user-toolbar-open" if html.classList.contains("user-toolbar-open")
  #     html.classList.toggle "feed-toolbar-open"
  #   ), false

  # Профиль
  profile = document.querySelector(".hero")
  profileActivator = document.querySelector(".hero__avatar")
  profileClose = document.querySelector(".hero__close")

  if profileActivator?
    cacheProfileHeight = profile.offsetHeight

    profile.style.height = cacheProfileHeight + "px"

    profileActivator.addEventListener "click", (->
      profile.style.height = window.innerHeight + "px"
      html.classList.add "hero-enabled"
    ), false

  if profileClose?
    profileClose.addEventListener "click", (->
      profile.style.height = cacheProfileHeight + "px"
      html.classList.remove "hero-enabled"
    ), false

  profileActions = document.querySelectorAll(".hero__user-actions");

  if profileActions?
    i = profileActions.length - 1
    while i >= 0
      profileActions[i].addEventListener "click", (->
        @classList.toggle "__open"
      ), false
      i--

  # Мета
  metaActions = document.querySelectorAll(".meta-actions")

  if metaActions?
    i = metaActions.length - 1

    while i >= 0
      metaActions[i].addEventListener "click", (->
        this.classList.toggle "__open"
      ), false
      i--

  # Комментарии
  commentActions = document.querySelectorAll(".comment__actions")

  if commentActions?
    i = commentActions.length - 1

    while i >= 0
      commentActions[i].addEventListener "click", (->
        @classList.toggle "__open"
      ), false
      i--

), false