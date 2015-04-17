_  = require 'lodash'
classnames = require 'classnames'
DesignSettingsSliderPrevButton = require './slider/prevButton'
DesignSettingsSliderNextButton = require './slider/nextButton'
{ PropTypes } = React

DesignSettingsSlider = React.createClass
  displayName: 'DesignSettingsSlider'

  propTypes:
    className: PropTypes.string
    children: PropTypes.element.isRequired

  getInitialState: ->
    inited: false
    leftLimit: true
    rightLimit: false
    leftOffset: 0

  componentDidMount: ->
    @setState(inited: true)

  render: ->
    sliderClasses = classnames('slider', {
      '__inited': @state.inited
      '__leftlimit': @state.leftLimit
      '__rightlimit': @state.rightLimit
    })
    sliderClasses = [sliderClasses, @props.className].join ' '

    return <div className={ sliderClasses }>
             <div ref="main"
                  className="slider__main">
               <div ref="list"
                    className="slider__list"
                    style={ @getListStyles() }>
                 <div className="slider__table">
                   <div className="slider__table-cell">
                     { @props.children }
                   </div>
                 </div>
               </div>
             </div>
             { @renderButtons() }
           </div>

  renderButtons: ->
    buttons = []
    prevButton = <DesignSettingsSliderPrevButton onClick={ @slidePrev } key="prev" />
    nextButton = <DesignSettingsSliderNextButton onClick={ @slideNext } key="next" />

    if @state.inited
      listWidth = @refs.list.getDOMNode().offsetWidth
      mainWidth = @refs.main.getDOMNode().offsetWidth

      if listWidth > mainWidth
        buttons = buttons.concat prevButton, nextButton

    buttons

  slidePrev: ->
    rightLimit = false
    leftLimit  = @state.leftLimit
    listWidth  = @refs.list.getDOMNode().offsetWidth
    mainWidth  = @refs.main.getDOMNode().offsetWidth
    leftOffset = Math.abs @state.leftOffset
    shift      = mainWidth - 40

    return if leftOffset == 0

    if leftOffset - shift <= 0
      leftOffset = 0
      leftLimit = true      
    else
      leftOffset = leftOffset - shift

    @setState {leftLimit, rightLimit, leftOffset: leftOffset * -1}

  slideNext: ->
    leftLimit  = false
    rightLimit = @state.rightLimit
    listWidth  = @refs.list.getDOMNode().offsetWidth
    mainWidth  = @refs.main.getDOMNode().offsetWidth
    leftOffset = Math.abs @state.leftOffset
    shift      = mainWidth - 40

    return if leftOffset + shift >= listWidth

    if leftOffset + shift >= listWidth - mainWidth
      rightLimit = true
      leftOffset = listWidth - mainWidth
    else
      leftOffset = leftOffset + shift

    @setState {leftLimit, rightLimit, leftOffset: leftOffset * -1}

  getListStyles: ->
    styles = {}
    supportedTransform = @getSupportedTransform()

    if supportedTransform
      styles[supportedTransform] = 'translateX(' + @state.leftOffset + 'px)'
    else
      styles.left = @state.leftOffset

    styles

  getSupportedTransform: ->
    # It will return either the name of the first supported prefix or false 
    # if none of the prefixes are supported
    prefixes = 'transform WebkitTransform MozTransform OTransform msTransform'.split ' '
    div = document.createElement 'div'
    firstPrefix = _.find prefixes, (prefix) -> div.style[prefix]?

    return firstPrefix ? false

module.exports = DesignSettingsSlider