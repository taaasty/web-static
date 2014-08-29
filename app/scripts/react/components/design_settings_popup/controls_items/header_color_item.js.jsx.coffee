###* @jsx React.DOM ###

window.DesignSettingsPopup_ControlsHeaderColorItem = React.createClass

  render: ->
   `<div className="settings-design__control settings-design__control--header-color" data-key="headerColor">
      <div className="settings-design__control-inner">
        <span className="settings-design__valign"></span>
        <span className="settings-design__text absolute--left animate--down">Заголовок блога</span>
        <span className="settings-design__state settings-design__state--radiobutton absolute--right animate--right">
          <span className="settings-design__state-i"></span>
        </span>
        <span className="form-radiogroup form-radiogroup--radiobuttons form-radiogroup--header-color absolute--left animate--up">
          <label className="form-radio form-radio--white" htmlFor="tlog-headercolor-white">
            <span className="form-radio__inner">
              <span className="form-radio__text">Белый</span>
              <input className="form-radio__input" id="tlog-headercolor-white" name="headerColor" type="radio" value="white" />
            </span>
          </label>
          <label className="form-radio form-radio--black" htmlFor="tlog-headercolor-black">
            <span className="form-radio__inner">
              <span className="form-radio__text">Черный</span>
              <input className="form-radio__input" id="tlog-headercolor-black" name="headerColor" type="radio" value="black" />
            </span>
          </label>
          <label className="form-radio form-radio--white-on-black" htmlFor="tlog-headercolor-whiteonblack">
            <span className="form-radio__inner">
              <span className="form-radio__text">Белый на черном</span>
              <input className="form-radio__input" id="tlog-headercolor-whiteonblack" name="headerColor" type="radio" value="whiteonblack" />
            </span>
          </label>
          <label className="form-radio form-radio--black-on-white form-radio--active" htmlFor="tlog-headercolor-blackonwhite">
            <span className="form-radio__inner">
              <span className="form-radio__text">Черный на белом</span>
              <input className="form-radio__input" id="tlog-headercolor-blackonwhite" name="headerColor" type="radio" value="blackonwhite" />
            </span>
          </label>
        </span>
      </div>
    </div>`