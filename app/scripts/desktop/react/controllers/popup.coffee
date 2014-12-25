class window.ReactPopup

  constructor: ->
    @popupContainer = $('<\div>').appendTo('body').get(0)

  show: (reactClass, args) ->
    React.render (
      <PopupBox {...args}>
        <reactClass {...args} />
      </PopupBox>
    ), @popupContainer

  close: ->
    _.defer => React.unmountComponentAtNode @popupContainer