ReactColorPicker = require 'react-color-picker'
{ PropTypes } = React

closest = (el, target) ->
  while target.parentNode
    return true if target is el
    target = target.parentNode
  false

DesignSettingsColorPickerPopup = React.createClass
  displayName: 'DesignSettingsColorPickerPopup'

  propTypes:
    color: PropTypes.string.isRequired
    activatorRect: PropTypes.object.isRequired
    onDrag: PropTypes.func.isRequired
    onClose: PropTypes.func.isRequired
    onChange: PropTypes.func.isRequired

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
    $(document).on 'click', @handleDocumentClick
    $(document).on 'scroll', @props.onClose

  componentWillUnmount: ->
    Mousetrap.unbind 'esc'
    $('.scroller__pane').off 'scroll', @props.onClose
    $(document).off 'click', @handleDocumentClick
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
          onDrag={ @handleDrag }
          onChange={ @handleChange } />
    </div>

  handleDrag: (color) ->
    @props.onDrag color

  handleChange: (color) ->
    @props.onChange color

  handleDocumentClick: (e) ->
    isClickInside = closest @getDOMNode(), e.target
    @props.onClose() unless isClickInside or e.target.type is 'radio'

module.exports = DesignSettingsColorPickerPopup