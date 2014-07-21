class window.ReactPopup

  constructor: ->
    @popupContainer    = $('<\div>').appendTo('body').get(0)

  show: (react_class, args) ->
    _.defer => React.renderComponent PopupBox(args, react_class(args)), @popupContainer

  close: ->
    _.defer => React.unmountComponentAtNode @popupContainer