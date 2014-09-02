###* @jsx React.DOM ###

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
   `<div className="settings-design__control settings-design__control--header-color" data-key="headerColor">
      <div className="settings-design__control-inner">
        <span className="settings-design__valign"></span>
        <span className="settings-design__text absolute--left animate--down">Заголовок блога</span>
        <span className="settings-design__state settings-design__state--radiobutton absolute--right animate--right">
          <span className="settings-design__state-i"></span>
        </span>
        <span className="form-radiogroup form-radiogroup--radiobuttons form-radiogroup--header-color absolute--left animate--up">
          <DesignSettingsPopup_ControlsRadioButton value="white"
                                                   settingId="headerColor"
                                                   isActive={ this.state.active == "white" }
                                                   text="Белый"
                                                   onChange={ this.onChange } />

          <DesignSettingsPopup_ControlsRadioButton value="black"
                                                   settingId="headerColor"
                                                   isActive={ this.state.active == "black" }
                                                   text="Чёрный"
                                                   onChange={ this.onChange } />

          <DesignSettingsPopup_ControlsRadioButton value="whiteonblack"
                                                   settingId="headerColor"
                                                   isActive={ this.state.active == "whiteonblack" }
                                                   text="Белый на чёрном"
                                                   className="white-on-black"
                                                   onChange={ this.onChange } />

          <DesignSettingsPopup_ControlsRadioButton value="blackonwhite"
                                                   settingId="headerColor"
                                                   isActive={ this.state.active == "blackonwhite" }
                                                   text="Чёрный на белом"
                                                   className="black-on-white"
                                                   onChange={ this.onChange } />
        </span>
      </div>
    </div>`

  onChange: (value) ->
    unless @state.active is value
      @setState active: value
      @props.saveCallback value