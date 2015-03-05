DesignSettingsDropZone = React.createClass
  displayName: 'DesignSettingsDropZone'

  render: ->
    <div className="design-settings__dragzone">
      <div className="design-settings__dragzone-table">
        <div className="design-settings__dragzone-cell">
          <div className="design-settings__dragzone-text">
            Отпустите картинку и она начнет загружаться
          </div>
        </div>
      </div>
    </div>

module.exports = DesignSettingsDropZone