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

  getPopupClasses: (baseClasses = '') ->
    popupClasses = baseClasses

    if @isMounted() && @props.visible
      menu        = @getDOMNode()
      menuOffsets = menu.getBoundingClientRect()
      viewportWH  = getViewportWH()

      isNotEnoughBottomSpace = =>
        menuSize       = getSize menu
        menuOffsetTop  = menuOffsets.top
        viewportHeight = viewportWH[1]

        if viewportHeight - REVERSE_MARGIN < menuOffsetTop + menuSize[1] then true else false

      isNotEnoughRightSpace = =>
        menuOffsetRight = menuOffsets.right
        viewportWidth   = viewportWH[0]

        if viewportWidth - REVERSE_MARGIN < menuOffsetRight then true else false

      popupClasses += ' __top'   if isNotEnoughBottomSpace()
      popupClasses += ' __right' if isNotEnoughRightSpace()

    popupClasses

module.exports = DropdownMenuMixin