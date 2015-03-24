{ PropTypes } = React

DropZone = React.createClass
  displayName: 'DropZone'

  propTypes:
    global: PropTypes.bool
    children: PropTypes.oneOfType([
      PropTypes.element, PropTypes.array
    ]).isRequired
    onDragOver: PropTypes.func.isRequired
    onDragLeave: PropTypes.func.isRequired
    onDrop: PropTypes.func.isRequired

  getDefaultProps: ->
    global: false

  componentDidMount: ->
    if @props.global
      $(document).on 'dragover', @handleDragOver
      $(document).on 'dragleave', @handleDragLeave
      $(document).on 'drop', @handleDrop

  componentWillUnmount: ->
    if @props.global
      $(document).off 'dragover', @handleDragOver
      $(document).off 'dragleave', @handleDragLeave
      $(document).off 'drop', @handleDrop

  handleDragOver: (e) ->
    e.preventDefault()
    @props.onDragOver()

  handleDragLeave: (e) ->
    e.preventDefault()
    @props.onDragLeave()

  handleDrop: (e) ->
    e.preventDefault()
    files = e.originalEvent.dataTransfer.files
    @props.onDrop files

  render: ->
    <div>{ @props.children }</div>

module.exports = DropZone

# DRAG_HOVER_CLASS = 'state--drag-hover'
# DRAGOFF_TIMEOUT  = 500

# window.PostEditor_Dragging =

#   getInitialState: ->
#     isDragging: false

#   componentDidMount: ->
#     @bindDragging()

#   componentWillUnmount: ->
#     @unbindDragging()

#   componentDidUpdate: ->
#     @updateDropZoneClass @state.isDragging

#   dragOver:  ->
#     clearTimeout @_dragLeaveTimer if @_dragLeaveTimer?
#     @draggingOn()

#   dragLeave: ->
#     clearTimeout @_dragLeaveTimer if @_dragLeaveTimer?
#     @_dragLeaveTimer = setTimeout @draggingOff, DRAGOFF_TIMEOUT

#   draggingOn: ->
#     @setState isDragging: true, isInserting: false

#   draggingOff: ->
#     @setState isDragging: false, isInserting: false

#   updateDropZoneClass: (active) ->
#     $dropZone = $ @dropZoneNode()
#     $dropZone.toggleClass DRAG_HOVER_CLASS, active

#   bindDragging: ->
#     $(document).on 'dragover', @dragOver
#     $(document).on 'dragleave', @dragLeave
#     $(document).on 'drop', @draggingOff

#   unbindDragging: ->
#     $(document).off 'dragover', @dragOver
#     $(document).off 'dragleave', @dragLeave
#     $(document).off 'drop', @draggingOff

#   dropZoneNode: ->
#     @refs.layout.refs.dropZone.getDOMNode()