class PopupController
  container: null

  constructor: ({@dispatcher, container}) ->
    @container = container ? @getContainer()
    @listenDispatcher()

  getContainer: (containerSelector = 'popup-container')->
    container = document.querySelector "[#{containerSelector}]"

    unless container?
      container = document.createElement 'div'
      container.setAttribute containerSelector, ''
      document.body.appendChild container

    container

  show: (reactClass, props, containerSelector) ->
    container = @getContainer containerSelector

    React.render <reactClass {...props} />, container

  listenDispatcher: ->
    @dispatcher.register (payload) =>
      action = payload.action

      switch action.type
        when Constants.popup.OPEN
          { reactClass, props, containerSelector } = action

          @show reactClass, props, containerSelector

module.exports = PopupController


# _oldPageName = null

# getContainer = ->
#   container = document.querySelector '[screen-container]'

#   unless container?
#     container = document.createElement 'div'
#     container.setAttribute 'screen-container', ''
#     container.style.height = '100%'
#     document.body.appendChild container

#   container

# switchPageName = (pageName) ->
#   oldClassName = document.documentElement.className
#   _oldPageName = oldClassName.match(/.*-page/) if _oldPageName is null
#   document.documentElement.className = oldClassName.replace /.*-page/, pageName

# restorePageName = ->
#   oldClassName = document.documentElement.className
#   document.documentElement.className = oldClassName.replace /.*-page/, _oldPageName
#   _oldPageName = null

# ScreenController =

#   show: (reactClass, props, pageName) ->
#     props.fixed  = true
#     container    = getContainer()
#     appContainer = document.getElementById 'App'
#     appContainer.style.display = 'none'

#     switchPageName pageName
#     React.render <reactClass {...props} />, container

#   close: ->
#     container    = getContainer()
#     appContainer = document.getElementById 'App'
#     appContainer.style.display = ''

#     restorePageName()
#     setTimeout (->
#       React.unmountComponentAtNode container
#     ), 0

# module.exports = ScreenController









# Constants = require '../constants/constants'

# class LayoutStatesController
#   layoutEl: null
#   states:
#     userToolbar: 'main-toolbar-open'

#   constructor: ({@dispatcher, layoutEl}) ->
#     @layoutEl = layoutEl ? document.body
#     @listenDispatcher()

#     # @dispatcher
#     # main-toolbar-open

#   toggleState: (UIelement, value) ->
#     stateName = @states[UIelement]
#     # Используем add и remove вместо toggle, чтобы явно следовать внутренним стейтам
#     # компонентов. Если у в лейауте был класс компонента, а из компонента пришло
#     # что нужно его установить, то мы просто вызываем add, который ничего не испортит.
#     # Если же будет toggle, то он уберёт класс компонента и будет рассинхрон.
#     methodName = if value then 'add' else 'remove'

#     @layoutEl.classList[methodName] stateName

#   listenDispatcher: ->
#     @dispatcher.register (payload) =>
#       action = payload.action

#       switch action.type
#         when Constants.userToolbar.TOGGLE_VISIBILITY
#           @toggleState 'userToolbar', action.value

# module.exports = LayoutStatesController