{ PropTypes } = React

DesignSettingsSliderPrevButton = React.createClass
  displayName: 'DesignSettingsSliderPrevButton'

  propTypes:
    onClick: PropTypes.func.isRequired

  render: ->
    <div className="slider__btn slider__btn--left"
         onClick={ @handleClick } />

  handleClick: ->
    @props.onClick()

module.exports = DesignSettingsSliderPrevButton