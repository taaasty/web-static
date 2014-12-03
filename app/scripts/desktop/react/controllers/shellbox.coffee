class window.ReactShellBox

  constructor: ->
    @shellboxContainer = $('<\div>').appendTo('body').get(0)

  show: (react_class, args) ->
    _.defer =>
      React.renderComponent ShellBox(null, react_class(args)), @shellboxContainer

  close: ->
    _.defer =>
      React.unmountComponentAtNode @shellboxContainer