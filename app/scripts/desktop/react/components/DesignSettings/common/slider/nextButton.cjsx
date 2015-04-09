{ PropTypes } = React

DesignSettingsSliderNextButton = React.createClass
  displayName: 'DesignSettingsSliderNextButton'

  propTypes:
    onClick: PropTypes.func.isRequired

  render: ->
    <div className="slider__btn slider__btn--right"
         onClick={ @handleClick } />

  handleClick: ->
    @props.onClick()

module.exports = DesignSettingsSliderNextButton