###* @jsx React.DOM ###

window.DesignSettingsPopup_ControlsAlignItem = React.createClass

  render: ->
   `<div className="settings-design__control settings-design__control--cover-align" data-key="coverAlign">
      <div className="settings-design__control-inner">
        <span className="settings-design__valign"></span>
        <span className="settings-design__text absolute--left animate--down">Настройка фона</span>
        <span className="settings-design__state absolute--right animate--right">
          <span className="settings-design__state-i"></span>
        </span>
        <span className="form-radiogroup form-radiogroup--dotted-list absolute--left animate--up">
          <label className="form-radio form-radio--repeat" htmlFor="tlog-coveralign-justify">
            <span className="form-radio__inner">
              <span className="form-radio__text">по ширине</span>
              <input className="form-radio__input" id="tlog-coveralign-justify" name="coverAlign" type="radio" value="justify" />
            </span>
          </label>
          <label className="form-radio form-radio--repeat form-radio--active" htmlFor="tlog-coveralign-center">
            <span className="form-radio__inner">
              <span className="form-radio__text">по центру</span>
              <input className="form-radio__input" id="tlog-coveralign-center" name="coverAlign" type="radio" value="center" />
            </span>
          </label>
        </span>
      </div>
    </div>`