###* @jsx React.DOM ###

SETTING_TITLE = 'Настройка фона'

window.DesignSettingsPopup_ControlsAlignItem = React.createClass

  # Известные варианты выравнивания
  # - justify
  # - center
  # - repeat

  propTypes:
    coverAlign:   React.PropTypes.string.isRequired
    saveCallback: React.PropTypes.func.isRequired

  render: ->
   `<div className="settings-design__control settings-design__control--cover-align">
      <div className="settings-design__control-inner">
        <span className="settings-design__valign"></span>
        <span className="settings-design__text absolute--left animate--down">{ SETTING_TITLE }</span>
        <span className="settings-design__state absolute--right animate--right">
          <span className="settings-design__state-i"></span>
        </span>
        <span className="form-radiogroup form-radiogroup--dotted-list absolute--left animate--up">
          <DesignSettingsPopup_ControlsRadioButton value="justify"
                                                   settingId="coverAlign"
                                                   isActive={ this.props.coverAlign == "justify" }
                                                   text="по ширине"
                                                   onChange={ this.onChange } />

          <DesignSettingsPopup_ControlsRadioButton value="center"
                                                   settingId="coverAlign"
                                                   isActive={ this.props.coverAlign == "center" }
                                                   text="по центру"
                                                   onChange={ this.onChange } />
        </span>
      </div>
    </div>`

  onChange: (value) ->
    @props.saveCallback(value) if @props.coverAlign isnt value