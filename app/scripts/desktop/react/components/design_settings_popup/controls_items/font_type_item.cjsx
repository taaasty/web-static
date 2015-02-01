window.DesignSettingsPopup_ControlsFontTypeItem = React.createClass

  # Известные варианты шрифтов
  # - sans
  # - serif

  propTypes:
    fontType:     React.PropTypes.string.isRequired
    saveCallback: React.PropTypes.func.isRequired

  getInitialState: ->
    active: @props.fontType

  render: ->
    <div className="settings-design__control settings-design__control--font-type" data-key="fontType">
      <div className="settings-design__control-inner">
        <span className="settings-design__valign"></span>
        <span className="settings-design__text absolute--left animate--down">
          { i18n.t('design_settings_font_type') }
        </span>
        <span className="settings-design__state absolute--right animate--right">
          <span className="settings-design__state-i">Aa</span>
        </span>
        <span className="form-radiogroup form-radiogroup--type-font absolute--left animate--up">
          <DesignSettingsPopup_ControlsRadioButton value="sans"
                                                   settingId="fontType"
                                                   isActive={ this.state.active == "sans" }
                                                   text="Aa"
                                                   className="sans-serif"
                                                   onChange={ this.onChange } />

          <DesignSettingsPopup_ControlsRadioButton value="serif"
                                                   settingId="fontType"
                                                   isActive={ this.state.active == "serif" }
                                                   text="Aa"
                                                   onChange={ this.onChange } />
        </span>
      </div>
    </div>

  onChange: (value) ->
    unless @state.active is value
      @setState active: value
      @props.saveCallback value