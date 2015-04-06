let DesignSettingsDropZone = React.createClass({
  render() {
    return (
      <div className="design-settings__dragzone">
        <div className="design-settings__dragzone-table">
          <div className="design-settings__dragzone-cell">
            <div className="design-settings__dragzone-text">
              Отпустите картинку и она начнет загружаться
            </div>
          </div>
        </div>
      </div>
    );
  }
});

export default DesignSettingsDropZone;