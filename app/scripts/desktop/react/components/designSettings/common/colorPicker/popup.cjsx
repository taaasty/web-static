ReactColorPicker = require 'react-color-picker'
{ PropTypes } = React

DesignSettingsColorPickerPopup = React.createClass
  displayName: 'DesignSettingsColorPickerPopup'

  propTypes:
    color: PropTypes.string.isRequired
    activatorRect: PropTypes.object.isRequired
    onDrag: PropTypes.func.isRequired
    onClose: PropTypes.func.isRequired

  getInitialState: ->
    top: -9999
    left: -9999

  componentDidMount: ->
    activatorRect = @props.activatorRect
    popupRect = @getDOMNode().getBoundingClientRect()

    @setState
      top: activatorRect.top + activatorRect.height
      left: activatorRect.left - (popupRect.width - activatorRect.width) / 2

    Mousetrap.bind 'esc', @props.onClose
    $('.scroller__pane').on 'scroll', @props.onClose
    $(document).on 'scroll', @props.onClose

  componentWillUnmount: ->
    Mousetrap.unbind 'esc'
    $('.scroller__pane').off 'scroll', @props.onClose
    $(document).off 'scroll', @props.onClose

  render: ->
    <div className="color-picker-popup"
         style={{ top: @state.top, left: @state.left }}>
      <i className="color-picker-popup__arrow" />
      <ReactColorPicker
          defaultValue={ @props.color }
          saturationWidth={ 140 }
          saturationHeight={ 140 }
          hueWidth={ 6 }
          onDrag={ @handleDrag } />
    </div>

  handleDrag: (color) ->
    @props.onDrag color

module.exports = DesignSettingsColorPickerPopup