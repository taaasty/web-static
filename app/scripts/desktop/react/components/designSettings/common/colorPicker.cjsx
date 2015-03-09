PopupActions = require '../../../actions/popup'
{ PropTypes } = React

# TODO: Нужно как-то избавиться от этого, может динамически вычеслять при инициализации компонента попапа
# POPUP_WIDTH = 176

DesignSettingsColorPicker = React.createClass

  propTypes:
    color: PropTypes.string.isRequired
    disabled: PropTypes.bool

  getInitialState: ->
    open: false
    color: @props.color

#   componentDidMount: ->
#     $(window).on 'scroll', @closePopup
#     Mousetrap.bind 'esc', @closePopup

#   componentWillUnmount: ->
#     $(window).off 'scroll', @closePopup
#     Mousetrap.unbind 'esc', @closePopup

  render: ->
    <span className="color-picker"
          style={{ backgroundColor: @state.color }}
          onClick={ @handleActivatorClick } />

  isOpen: ->
    @state.open is true

  open: ->
    PopupActions.showColorPicker()
    @setState(open: true)

  close: ->
    @setState(open: false)

  toggle: ->
    if @isOpen() then @close() else @open()

#   onDrag: (color, c) ->
#     @setState currentColor: color

  handleActivatorClick: ->
    @toggle() unless @props.disabled

#   handleClickActivator: (e) ->
#     if !@props.disabled
#       unless @state.currentState is STATE_CHOICE
#         @openPopup()
#       else
#         @closePopup()

#   getCoordsPopup: ->
#     $activator = $(@refs.activator.getDOMNode())

#     widthActivator = $activator.outerWidth()
#     heightActivator = $activator.outerHeight()

#     return {
#       top : $activator.offset().top + heightActivator
#       left: $activator.offset().left - (POPUP_WIDTH - widthActivator) / 2
#     }

#   openPopup: ->
#     container = document.querySelectorAll('[color-picker-popup-container]')[0]

#     unless container
#       container = document.createElement 'div'
#       container.setAttribute 'color-picker-popup-container', ''
#       document.body.appendChild(container);

#     position = @getCoordsPopup()

#     React.render (
#       <ColorPicker_Popup color={ this.state.currentColor }
#                          position={ position }
#                          onDrag={ this.onDrag } />
#     ), container

#     @popupContainer = container
#     @activateChoiceState()

#   closePopup: ->
#     _.defer =>
#       React.unmountComponentAtNode @popupContainer
#       @activateViewState()

# module.exports = ColorPicker