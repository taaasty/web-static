AApp.service 'DesignSettingsDragable', ->
  handleClass       = '.js-popup-headbox'
  noTransitionClass = "no--transition"
  dragCursorClass   = "cursor--move"
  containment       = ".page"

  @draggable = (element) ->
    # TODO Проверять, может уже установили?
    headBox = element.find handleClass
    headBox.addClass dragCursorClass

    element.draggable
      handle:      handleClass
      containment: containment
      drag: -> element.addClass noTransitionClass
      stop: -> element.removeClass noTransitionClass

  return @

  #debugger
  #DesignSettingService =
    #show: ->
      #debugger
      #$rootScope.$emit 'showDesignSettings'

