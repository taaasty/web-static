{ PropTypes } = React

DesignSettingsOptionUpload = React.createClass
  displayName: 'DesignSettingsOptionUpload'

  propTypes:
    optionName: PropTypes.string.isRequired
    backgroundImageUrl: PropTypes.string.isRequired
    backgroundImageEnabled: PropTypes.bool.isRequired
    onImageUrlChange: PropTypes.func.isRequired
    onImageVisibilityChange: PropTypes.func.isRequired

  render: ->
    <span>
      <span className="design-settings__text ds-absolute-left ds-fadein-down">
        Перетащите или
        <span className="form-upload form-upload--cover">
          <span className="form-upload__text">
            загрузите
          </span>
          <input type="file"
                 className="form-upload__input"
                 onChange={ @handleChangeBackground } />
        </span>
      </span>
      <span className="design-settings__cover ds-absolute-right ds-fadeout-right"
            style={{ backgroundImage: 'url("' + @props.backgroundImageUrl + '")' }} />
      <span className="design-settings__text ds-absolute-right ds-fadein-left">
        <span className="form-checkbox">
          <input type="checkbox"
                 defaultChecked={ @props.backgroundImageEnabled }
                 id={ @props.optionName }
                 className="form-checkbox__input"
                 onChange={ @handleChangeVisibility } />
          <label htmlFor={ @props.optionName }
                 className="form-checkbox__label">
            <span className="form-checkbox__box">
              <i className="form-checkbox__icon" />
            </span>Вкл
          </label>
        </span>
      </span>
    </span>

  handleChangeVisibility: (e) ->
    @props.onImageVisibilityChange !e.target.checked

module.exports = DesignSettingsOptionUpload