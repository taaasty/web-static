###* @jsx React.DOM ###

window.DesignSettingsPopup_ControlsFeedColorItem = React.createClass

  render: ->
   `<div className="settings-design__control settings-design__control--feed-color" data-key="feedColor">
      <div className="settings-design__control-inner">
        <span className="settings-design__valign"></span>
        <span className="settings-design__text absolute--left animate--down">Цвет ленты и текста</span>
        <span className="settings-design__state settings-design__state--radiobutton absolute--right animate--right">
          <span className="settings-design__state-i"></span>
        </span>
        <span className="form-radiogroup form-radiogroup--radiobuttons form-radiogroup--feed-color absolute--left animate--up">
          <label className="form-radio form-radio--white form-radio--active" htmlFor="tlog-feedcolor-white">
            <span className="form-radio__inner">
              <span className="form-radio__text">Белая</span>
              <input className="form-radio__input" id="tlog-feedcolor-white" name="feedColor" type="radio" value="white" />
            </span>
          </label>
          <label className="form-radio form-radio--black" htmlFor="tlog-feedcolor-black">
            <span className="form-radio__inner">
              <span className="form-radio__text">Чёрная</span>
              <input className="form-radio__input" id="tlog-feedcolor-black" name="feedColor" type="radio" value="black" />
            </span>
          </label>
        </span>
      </div>
    </div>`