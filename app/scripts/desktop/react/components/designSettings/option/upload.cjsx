{ PropTypes } = React

DesignSettingsOptionUpload = React.createClass
  displayName: 'DesignSettingsOptionUpload'

  propTypes:
    stateName: PropTypes.string.isRequired
    value: PropTypes.string
    enabled: PropTypes.bool.isRequired
    onUpload: PropTypes.func.isRequired
    onVisibilityChange: PropTypes.func.isRequired

  render: ->
    <span>
      <span className="design-settings__text ds-absolute-left ds-fadein-down">
        Перетащите или
        <span className="form-upload form-upload--cover">
          <span className="form-upload__text">
            загрузите
          </span>
          <input type="file"
                 name={ @props.stateName }
                 className="form-upload__input"
                 onChange={ @handleChangeBackground } />
        </span>
      </span>
      <span className="design-settings__cover ds-absolute-right ds-fadeout-right"
            style={{ backgroundImage: 'url("' + @props.value + '")' }} />
      <span className="design-settings__text ds-absolute-right ds-fadein-left">
        <span className="form-checkbox">
          <input type="checkbox"
                 name={ @props.stateName }
                 value="none"
                 id={ @props.stateName }
                 className="form-checkbox__input"
                 onChange={ @handleChangeVisibility } />
          <label htmlFor={ @props.stateName }
                 className="form-checkbox__label">
            <span className="form-checkbox__box">
              <i className="form-checkbox__icon" />
            </span>Вкл
          </label>
        </span>
      </span>
    </span>

  handleChangeVisibility: (e) ->
    @props.onVisibilityChange !e.target.checked

module.exports = DesignSettingsOptionUpload