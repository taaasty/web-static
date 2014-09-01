###* @jsx React.DOM ###

window.DesignSettingsPopup_ControlsFeedColorItem = React.createClass

  # Известные варианты цветов ленты
  # - black
  # - white

  propTypes:
    feedColor:    React.PropTypes.string.isRequired
    saveCallback: React.PropTypes.func.isRequired

  render: ->
   `<div className="settings-design__control settings-design__control--feed-color" data-key="feedColor">
      <div className="settings-design__control-inner">
        <span className="settings-design__valign"></span>
        <span className="settings-design__text absolute--left animate--down">Цвет ленты и текста</span>
        <span className="settings-design__state settings-design__state--radiobutton absolute--right animate--right">
          <span className="settings-design__state-i"></span>
        </span>
        <span className="form-radiogroup form-radiogroup--radiobuttons form-radiogroup--feed-color absolute--left animate--up">
          <DesignSettingsPopup_ControlsRadioButton value="white"
                                                   settingId="feedColor"
                                                   isActive={ this.props.feedColor == "white" }
                                                   text="Белый"
                                                   onChange={ this.onChange } />

          <DesignSettingsPopup_ControlsRadioButton value="black"
                                                   settingId="feedColor"
                                                   isActive={ this.props.feedColor == "black" }
                                                   text="Чёрный"
                                                   onChange={ this.onChange } />
        </span>
      </div>
    </div>`

  onChange: (value) ->
    @props.saveCallback(value) if @props.feedColor isnt value