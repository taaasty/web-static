###* @jsx React.DOM ###

window.DesignSettingsPopup_ControlsFontTypeItem = React.createClass

  render: ->
   `<div className="settings-design__control settings-design__control--font-type" data-key="fontType">
      <div className="settings-design__control-inner">
        <span className="settings-design__valign"></span>
        <span className="settings-design__text absolute--left animate--down">Шрифт ленты</span>
        <span className="settings-design__state absolute--right animate--right">
          <span className="settings-design__state-i">Аа</span>
        </span>
        <span className="form-radiogroup form-radiogroup--type-font absolute--left animate--up">
          <label className="form-radio form-radio--sans-serif form-radio--active" htmlFor="tlog-fonttype-sans">
            <span className="form-radio__inner">
              <span className="form-radio__text">Аа</span>
              <input className="form-radio__input" id="tlog-fonttype-sans" name="fontType" type="radio" value="sans" />
            </span>
          </label>
          <label className="form-radio form-radio--serif" htmlFor="tlog-fonttype-serif">
            <span className="form-radio__inner">
              <span className="form-radio__text">Аа</span>
              <input className="form-radio__input" id="tlog-fonttype-serif" name="fontType" type="radio" value="serif" />
            </span>
          </label>
        </span>
      </div>
    </div>`