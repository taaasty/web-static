closest = (el, target) ->
  while target.parentNode
    return true if target is el
    target = target.parentNode
  false

ClickOutsideMixin =

  componentDidMount: ->
    document.addEventListener 'click', @onDocumentClick

  componentWillUnmount: ->
    document.removeEventListener 'click', @onDocumentClick

  onDocumentClick: (e) ->
    return unless @isOpenState()

    isClickInside = closest @getDOMNode(), e.target
    @activateCloseState() unless isClickInside

module.exports = ClickOutsideMixin