# TODO: Нужно как-то избавиться от этого, может динамически вычеслять при инициализации компонента попапа
POPUP_WIDTH = 176

STATE_VIEW   = 'view'
STATE_CHOICE = 'choice'

window.ColorPicker = React.createClass
  propTypes:
    color: React.PropTypes.string

  getInitialState: ->
    currentState: STATE_VIEW
    currentColor: @props.color

  getDefaultProps: ->
    color: '#2ac67e'

  componentDidMount: ->
    $(window).on 'scroll', @closePopup
    Mousetrap.bind 'esc', @closePopup

  componentWillUnmount: ->
    $(window).off 'scroll', @closePopup
    Mousetrap.unbind 'esc', @closePopup

  render: ->
    return <span ref="activator"
                style={{ background: this.state.currentColor }}
                className="color-picker"
                onClick={ this.handleClickActivator } />

  activateViewState: -> @setState(currentState: STATE_VIEW)

  activateChoiceState: -> @setState(currentState: STATE_CHOICE)

  onDrag: (color, c) ->
    @setState currentColor: color

  handleClickActivator: ->
    unless @state.currentState is STATE_CHOICE
      @openPopup()
    else
      @closePopup()

  getCoordsPopup: ->
    $activator = $(@refs.activator.getDOMNode())

    widthActivator = $activator.width()
    heightActivator = $activator.height()

    return {
      top : $activator.offset().top + heightActivator
      left: $activator.offset().left - (POPUP_WIDTH - widthActivator) / 2
    }

  openPopup: ->
    container = document.querySelectorAll('[color-picker-popup-container]')[0]

    unless container
      container = document.createElement 'div'
      container.setAttribute 'color-picker-popup-container', ''
      document.body.appendChild(container);

    position = @getCoordsPopup()

    React.render (
      <ColorPicker_Popup color={ this.state.currentColor }
                         position={ position }
                         onDrag={ this.onDrag } />
    ), container

    @popupContainer = container
    @activateChoiceState()

    $(@refs.activator.getDOMNode()).closest('.design-settings__control').addClass('__hover')

  closePopup: ->
    _.defer =>
      React.unmountComponentAtNode @popupContainer
      @activateViewState()

      $(@refs.activator.getDOMNode()).closest('.design-settings__control').removeClass('__hover')