CLASS_NAME_ATTR = 'data-react-class'
PROPS_ATTR      = 'data-react-props'

findReactDOMNodes = ->
  SELECTOR = '[' + CLASS_NAME_ATTR + ']'
  if jQuery? then $(SELECTOR) else document.querySelectorAll SELECTOR

mountReactComponents = ->
  nodes = findReactDOMNodes()
  i = 0

  while i < nodes.length
    node = nodes[i]
    className = node.getAttribute CLASS_NAME_ATTR

    constructor = window[className] || eval.call(window, className)
    if constructor?
      propsJson = node.getAttribute PROPS_ATTR
      props     = propsJson && JSON.parse propsJson

      React.render React.createElement(constructor, props), node
    ++i

unmountReactComponents = ->
  nodes = findReactDOMNodes()
  i = 0

  while i < nodes.length
    React.unmountComponentAtNode nodes[i]
    ++i

initialize = ->
  mountReactComponents()
  $(document).on 'page:change', mountReactComponents if jQuery?

module.exports =
  initialize: initialize