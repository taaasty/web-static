window.DesignSettingsPopup_ControlsFeedColorItem = React.createClass

  # Известные варианты цветов ленты
  # - black
  # - white

  propTypes:
    feedColor:    React.PropTypes.string.isRequired
    saveCallback: React.PropTypes.func.isRequired

  getInitialState: ->
    active: @props.feedColor

  render: ->
    <div className="settings-design__control settings-design__control--feed-color" data-key="feedColor">
      <div className="settings-design__control-inner">
        <span className="settings-design__valign"></span>
        <span className="settings-design__text absolute--left animate--down">
          { i18n.t('design_settings_feed_color') }
        </span>
        <span className="settings-design__state settings-design__state--radiobutton absolute--right animate--right">
          <span className="settings-design__state-i"></span>
        </span>
        <span className="form-radiogroup form-radiogroup--radiobuttons form-radiogroup--feed-color absolute--left animate--up">
          <DesignSettingsPopup_ControlsRadioButton value="white"
                                                   settingId="feedColor"
                                                   isActive={ this.state.active == "white" }
                                                   text={ i18n.t('design_settings_feed_color_white') }
                                                   onChange={ this.onChange } />

          <DesignSettingsPopup_ControlsRadioButton value="black"
                                                   settingId="feedColor"
                                                   isActive={ this.state.active == "black" }
                                                   text={ i18n.t('design_settings_feed_color_black') }
                                                   onChange={ this.onChange } />
        </span>
      </div>
    </div>

  onChange: (value) ->
    unless @state.active is value
      @setState active: value
      @props.saveCallback value