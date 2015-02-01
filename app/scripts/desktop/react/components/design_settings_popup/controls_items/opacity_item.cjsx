MINIMUM_OPACITY     = 0
MAXIMUM_OPACITY     = 1
STEP_OPACITY        = 0.01
TIMEOUT_BEFORE_SAVE = 1500

window.DesignSettingsPopup_ControlsOpacityItem = React.createClass
  mixins: [ComponentManipulationsMixin]

  # Данные по прозрачности
  ## Минимальная: 0
  ## Максимальная: 1
  ## Шаг: 0.01

  propTypes:
    feedOpacity:  React.PropTypes.number.isRequired
    saveCallback: React.PropTypes.func.isRequired

  getInitialState: ->
    feedOpacity: @props.feedOpacity

  componentDidMount: -> @_initSlider()

  componentWillUnmount: ->
    clearTimeout @timeout if @timeout

  render: ->
    <div className="settings-design__control settings-design__control--opacity">
      <div className="settings-design__control-inner">
        <span className="settings-design__valign"></span>
        <span className="settings-design__text absolute--left animate--down">
          { i18n.t('design_settings_opacity') }
        </span>
        <span ref="opacitySlider"
              className="form-range form-range--opacity form-range--yellow absolute--left animate--up">
          <input className="form-range__input" id="opacity-feed" name="feedOpacity" type="text" />
        </span>
        <span className="form-range-value">{ this._getFeedOpacityPercentage() }</span>
      </div>
    </div>

  setFeedOpacity: (value) ->
    @safeUpdate =>
      $feedBackground = $('.content-area__bg')

      @setState feedOpacity: value
      $feedBackground.css opacity: value

  _initSlider: ->
    $opacitySlider = $( @refs.opacitySlider.getDOMNode() )

    options =
      min: MINIMUM_OPACITY
      max: MAXIMUM_OPACITY
      step: STEP_OPACITY
      range: 'min'
      value: @state.feedOpacity
      animate: true
      orientation: 'horizontal'
      slide: (event, ui) =>
        clearTimeout @timeout if @timeout

        @setFeedOpacity ui.value

      change: (event, ui) =>
        clearTimeout @timeout if @timeout

        @timeout = setTimeout ( =>
          @props.saveCallback ui.value
        ), TIMEOUT_BEFORE_SAVE

    $opacitySlider.slider options

  _getFeedOpacityPercentage: ->
    (@state.feedOpacity * 100).toFixed() + '%'