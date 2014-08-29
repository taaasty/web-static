###* @jsx React.DOM ###

window.DesignSettingsPopup_ControlsBackgroundItem = React.createClass

  render: ->
   `<div className="settings-design__control settings-design__control--cover">
      <div className="settings-design__control-inner">
        <span className="settings-design__valign"></span>
        <span className="settings-design__text absolute--left animate--down">Фон блога</span>
        <span className="settings-design__text absolute--left animate--up">
          Перетащите или
          <span className="form-upload form-upload--cover">
            <span className="form-upload__text">загрузите</span>
            <input className="form-upload__input js-upload-cover-input" id="layout-cover" name="layout-cover" type="file" />
          </span>
        </span>
        <span className="settings-design__cover-pixel absolute--right animate--right js-cover-pixel"></span>
      </div>
    </div>`