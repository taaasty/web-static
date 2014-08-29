###* @jsx React.DOM ###

window.DesignSettingsPopup_ControlsOpacityItem = React.createClass

  render: ->
   `<div className="settings-design__control settings-design__control--opacity">
      <div className="settings-design__control-inner">
        <span className="settings-design__valign"></span>
        <span className="settings-design__text absolute--left animate--down">Прозрачность ленты</span>
        <span className="form-range form-range--opacity form-range--yellow absolute--left animate--up js-form-range-opacity ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all">
          <input className="form-range__input" id="opacity-feed" name="feedOpacity" type="text" />
          <div className="ui-slider-range ui-widget-header ui-slider-range-min" style={{ width: '100%' }}></div>
          <a className="ui-slider-handle ui-state-default ui-corner-all" href="#" style={{ left: '100%' }}></a>
        </span>
        <span className="form-range-value">100%</span>
      </div>
    </div>`