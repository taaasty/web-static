PopupActions = require '../../../actions/popup'
{ PropTypes } = React

DesignSettingsColorPicker = React.createClass
  displayName: 'DesignSettingsColorPicker'

  propTypes:
    color: PropTypes.string.isRequired
    onChange: PropTypes.func

  getInitialState: ->
    open: false
    color: @props.color

  getDefaultProps: ->
    color: '#2ac67e'

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
      onChange: @handleChange
      onClose: @activateCloseState

    @activateOpenState()

  close: ->
    PopupActions.closeColorPicker()
    @activateCloseState()

  toggle: ->
    if @state.open then @close() else @open()

  handleDrag: (color) ->
    @setState {color}

  handleChange: (color) ->
    @props.onChange? color

module.exports = DesignSettingsColorPicker