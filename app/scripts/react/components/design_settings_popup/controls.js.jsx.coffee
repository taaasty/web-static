###* @jsx React.DOM ###

window.DesignSettingsPopup_Controls = React.createClass

  render: ->
   `<div className="settings-design__controls">
      <DesignSettingsPopup_ControlsBackgroundItem />

      <DesignSettingsPopup_ControlsAlignItem />

      <DesignSettingsPopup_ControlsHeaderColorItem />

      <DesignSettingsPopup_ControlsFeedColorItem />

      <DesignSettingsPopup_ControlsFontTypeItem />

      <DesignSettingsPopup_ControlsOpacityItem />
    </div>`