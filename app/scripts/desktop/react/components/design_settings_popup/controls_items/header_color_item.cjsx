window.DesignSettingsPopup_ControlsHeaderColorItem = React.createClass

  # Известные варианты цветов заголовка
  # - black
  # - white
  # - blackonwhite
  # - whiteonblack
  # - auto

  propTypes:
    headerColor:  React.PropTypes.string.isRequired
    saveCallback: React.PropTypes.func.isRequired

  getInitialState: ->
    active: @props.headerColor

  render: ->
    <div className="settings-design__control settings-design__control--header-color" data-key="headerColor">
      <div className="settings-design__control-inner">
        <span className="settings-design__valign"></span>
        <span className="settings-design__text absolute--left animate--down">
          { i18n.t('design_settings_header_color') }
        </span>
        <span className="settings-design__state settings-design__state--radiobutton absolute--right animate--right">
          <span className="settings-design__state-i"></span>
        </span>
        <span className="form-radiogroup form-radiogroup--radiobuttons form-radiogroup--header-color absolute--left animate--up">
          <DesignSettingsPopup_ControlsRadioButton value="white"
                                                   settingId="headerColor"
                                                   isActive={ this.state.active == "white" }
                                                   text={ i18n.t('design_settings_header_color_white') }
                                                   onChange={ this.onChange } />

          <DesignSettingsPopup_ControlsRadioButton value="black"
                                                   settingId="headerColor"
                                                   isActive={ this.state.active == "black" }
                                                   text={ i18n.t('design_settings_header_color_black') }
                                                   onChange={ this.onChange } />

          <DesignSettingsPopup_ControlsRadioButton value="whiteonblack"
                                                   settingId="headerColor"
                                                   isActive={ this.state.active == "whiteonblack" }
                                                   text={ i18n.t('design_settings_header_color_white_on_black') }
                                                   className="white-on-black"
                                                   onChange={ this.onChange } />

          <DesignSettingsPopup_ControlsRadioButton value="blackonwhite"
                                                   settingId="headerColor"
                                                   isActive={ this.state.active == "blackonwhite" }
                                                   text={ i18n.t('design_settings_header_color_black_on_white') }
                                                   className="black-on-white"
                                                   onChange={ this.onChange } />
        </span>
      </div>
    </div>

  onChange: (value) ->
    unless @state.active is value
      @setState active: value
      @props.saveCallback value