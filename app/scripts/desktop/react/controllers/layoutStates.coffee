Constants = require '../constants/constants'

class LayoutStatesController
  layoutEl: null
  states:
    userToolbar: 'main-toolbar-open'

  constructor: ({@dispatcher, layoutEl}) ->
    @layoutEl = layoutEl ? document.body
    @listenDispatcher()

  toggleState: (UIelement, value) ->
    stateName = @states[UIelement]
    # Используем add и remove вместо toggle, чтобы явно следовать внутренним стейтам
    # компонентов. Если у в лейауте был класс компонента, а из компонента пришло
    # что нужно его установить, то мы просто вызываем add, который ничего не испортит.
    # Если же будет toggle, то он уберёт класс компонента и будет рассинхрон.
    methodName = if value then 'add' else 'remove'

    @layoutEl.classList[methodName] stateName

  listenDispatcher: ->
    @dispatcher.register (payload) =>
      action = payload.action

      switch action.type
        when Constants.userToolbar.TOGGLE_VISIBILITY
          @toggleState 'userToolbar', action.value

module.exports = LayoutStatesController