classSet = require 'react/lib/cx'
DesignSettingsDropZone = require './dropZone/index'
DesignSettingsGroups = require './groups/index'
DesignSettingsSaveButton = require './buttons/save'
{ PropTypes } = React

DesignSettings = React.createClass
  displayName: 'DesignSettings'

  propTypes:
    design: PropTypes.object.isRequired
    options: PropTypes.object.isRequired
    hasPaidValues: PropTypes.bool.isRequired
    hasDesignBundle: PropTypes.bool.isRequired
    onOptionChange: PropTypes.func.isRequired
    onSave: PropTypes.func.isRequired

  getInitialState: ->
    drag: false

  render: ->
    designSettingsClasses = classSet
      'design-settings': true
      '__draghover': @state.drag

    return <div className={ designSettingsClasses }
                onDragEnter={ @startDrag }>
             <DesignSettingsDropZone
                 onDragLeave={ @stopDrag }
                 onDrop={ @stopDrag } />
             <div className="design-settings__options">
               <DesignSettingsGroups
                   design={ @props.design }
                   options={ @props.options }
                   onOptionChange={ @props.onOptionChange } />
               <DesignSettingsSaveButton
                   hasPaidValues={ @props.hasPaidValues }
                   hasDesignBundle={ @props.hasDesignBundle }
                   onClick={ @props.onSave } />
             </div>
           </div>

  startDrag: ->
    @setState(drag: true) unless @state.drag

  stopDrag: (e) ->
    @setState(drag: false) if @state.drag

module.exports = DesignSettings