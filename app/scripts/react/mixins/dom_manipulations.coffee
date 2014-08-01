ENTRY_DELETE_ANIMATION_SPEED = 300

window.DOMManipulationsMixin =

  removeEntryFromDOM: (entryId, speed = ENTRY_DELETE_ANIMATION_SPEED) ->
    $entryNode = $("[data-id='#{entryId}'")

    $entryNode.slideUp(speed, =>
      @props.onDelete() if @props.onDelete?
      $entryNode.remove()
    )