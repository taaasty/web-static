#TODO: Этот контроллер будет слушать события на открытие и закрытие попапов.

class PopupController
  container: null

  constructor: ({@dispatcher, container}) ->
    @container = container ? @getContainer()
    @listenDispatcher()

  getContainer: (containerSelector = 'popup-container') ->
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