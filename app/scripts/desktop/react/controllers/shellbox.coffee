class window.ReactShellBox

  constructor: ->
    container = document.querySelectorAll('[shellbox-container]')[0]

    unless container
      container = $('<\div>', {'shellbox-container': ''}).appendTo('body')[0]

    @shellboxContainer = container

  show: (Component, args) ->
    React.render (
      <ShellBox>
        <Component {...args} />
      </ShellBox>
    ), @shellboxContainer

  close: ->
    _.defer =>
      React.unmountComponentAtNode @shellboxContainer