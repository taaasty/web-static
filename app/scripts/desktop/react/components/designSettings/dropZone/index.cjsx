{ PropTypes } = React

DesignSettingsDropZone = React.createClass
  displayName: 'DesignSettingsDropZone'

  propTypes:
    onDragLeave: PropTypes.func.isRequired
    onDrop: PropTypes.func.isRequired

  componentDidMount: ->
    window.ondragover = (e) -> e.preventDefault()
    window.ondrop = (e) -> e.preventDefault()

  componentWillUnmount: ->
    window.ondragover = null
    window.ondrop = null

  render: ->
    <div className="design-settings__dragzone"
         onDragLeave={ @handleDragLeave }
         onDrop={ @handleDrop }>
      <div className="design-settings__dragzone-table">
        <div className="design-settings__dragzone-cell">
          <div className="design-settings__dragzone-text">
            Отпустите картинку и она начнет загружаться
          </div>
        </div>
      </div>
    </div>

  handleDragLeave: (e) ->
    dropzoneRect = @getDOMNode().getBoundingClientRect()
    x = e.clientX
    y = e.clientY
    top = dropzoneRect.top
    bottom = top + dropzoneRect.height
    left = dropzoneRect.left
    right = left + dropzoneRect.width

    @props.onDragLeave() if y <= top || y >= bottom || x <= left || x >= right

  handleDrop: (e) ->
    e.preventDefault()
    
    file = e.dataTransfer.files[0]
    reader = new FileReader()
    
    reader.onload = (e) ->
      console.log(e.target)
    
    console.log(file)
    reader.readAsDataURL(file)

module.exports = DesignSettingsDropZone