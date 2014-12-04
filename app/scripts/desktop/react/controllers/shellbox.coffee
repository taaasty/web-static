class window.ReactShellBox

  constructor: ->
    container = document.querySelectorAll('[shellbox-container]')[0]

    unless container
      container = $('<\div>', {'shellbox-container': ''}).appendTo('body')[0]

    @shellboxContainer = container

  show: (react_class, args) ->
    _.defer =>
      React.renderComponent ShellBox(null, react_class(args)), @shellboxContainer

  close: ->
    _.defer =>
      React.unmountComponentAtNode @shellboxContainer