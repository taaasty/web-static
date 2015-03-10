PopupActions = require '../../../actions/popup'
{ PropTypes } = React

DesignSettingsColorPicker = React.createClass
  displayName: 'DesignSettingsColorPicker'

  propTypes:
    color: PropTypes.string
    onChange: PropTypes.func.isRequired

  getDefaultProps: ->
    color: '#fff'

  getInitialState: ->
    open: false
    color: @props.color

  componentWillUnmount: ->
    PopupActions.closeColorPicker() if @state.open

  render: ->
    <span className="color-picker"
          style={{ backgroundColor: @state.color }}
          onClick={ @toggle } />

  activateCloseState: -> @setState(open: false)
  activateOpenState:  -> @setState(open: true)

  getValue: ->
    @state.color

  open: ->
    activator = @getDOMNode()

    PopupActions.showColorPicker
      color: @state.color
      activatorRect: activator.getBoundingClientRect()
      onDrag: @handleDrag
      onClose: @activateCloseState

    @activateOpenState()

  close: ->
    PopupActions.closeColorPicker()
    @activateCloseState()

  toggle: ->
    if @state.open then @close() else @open()

  handleDrag: (color) ->
    @props.onChange color
    @setState {color}

module.exports = DesignSettingsColorPicker