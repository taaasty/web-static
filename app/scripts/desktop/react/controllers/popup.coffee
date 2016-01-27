{ render, unmountComponentAtNode } = require 'react-dom';

class window.ReactPopup

  constructor: ->
    @popupContainer = $('<\div>').appendTo('body').get(0)

  show: (reactClass, args) ->
    render (
      <PopupBox {...args}>
        <reactClass {...args} />
      </PopupBox>
    ), @popupContainer

  close: ->
    _.defer => unmountComponentAtNode @popupContainer
