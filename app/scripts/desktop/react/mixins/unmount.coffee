{ findDOMNode, unmountComponentAtNode } = require 'react-dom'

window.ReactUnmountMixin =

  unmount: ->
    _.defer => unmountComponentAtNode(findDOMNode(this).parentNode)
