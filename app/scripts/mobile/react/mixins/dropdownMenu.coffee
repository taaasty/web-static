REVERSE_MARGIN = 5

getSize = (elem) ->
  [elem.offsetWidth, elem.offsetHeight]

getViewportWH = ->
  w = window
  d = document
  e = d.documentElement
  g = d.getElementsByTagName('body')[0]
  x = w.innerWidth  || e.clientWidth  || g.clientWidth
  y = w.innerHeight || e.clientHeight || g.clientHeight

  return [x, y]

DropdownMenuMixin =

  getPopupStyles: ->
    styles = {}

    unless @props.visible
      styles =
        display:    'block'
        position:   'absolute'
        visibility: 'hidden'

  getPopupClasses: (baseClasses = '') ->
    isNotEnoughSpace = =>
      menu           = @getDOMNode()
      menuSize       = getSize menu
      menuOffsetTop  = menu.getBoundingClientRect().top
      viewportHeight = getViewportWH()[1]

      if viewportHeight - REVERSE_MARGIN < menuOffsetTop + menuSize[1] then true else false

    popupClasses = baseClasses

    if @isMounted()
      popupClasses += ' __top' if isNotEnoughSpace()

    popupClasses

module.exports = DropdownMenuMixin